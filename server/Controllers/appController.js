import User from "../Models/User.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "themohdhasnain@gmail.com",
    pass: "zwgtavpbyjnyykrd",
  },
});

export async function generateOTP(req, res) {
  const user = await User.findOne({ email: req.query.email });
  if (!user) return res.status(500).send("User with this email does't exist!");

  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  await transporter.sendMail({
    from: "themohdhasnain@gmail.com", // sender address
    to: req.query.email, // list of receivers
    subject: "Reset Password", // Subject line
    text: req.app.locals.OTP, // plain text body
  });

  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hash(password, salt);

      user = { ...user._doc, password: securePassword };
      await User.findOneAndUpdate({ email }, { $set: user }, { new: true });
      req.app.locals.resetSession = false;

      res.json({ message: "Sucessfull!" });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
