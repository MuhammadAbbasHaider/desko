import { LockOutlined, UserOutlined ,MailOutlined, MobileOutlined} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useAuthContext } from "../../Contexts/AuthContext";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Register = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [credential, setCredential] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState()

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      await axios.get(
        `http://localhost:8800/api/auth/registerotp?email=${values.email}`
      );

      showModal();
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  const onVerify = async () => {
    try {
      setLoading(true)
      await axios.post(
        `http://localhost:8800/api/auth/verifyotp?code=${credential.otp}`
      );

      const { data } = await axios.post(
        "http://localhost:8800/api/auth/register",
        {
          email: credential.email,
          password: credential.password,
          phone: value,
          lname: credential.lname,
          fname: credential.fname
        }
      );

      var decoded = jwt_decode(data.authToken);
      if (!decoded.user.isAdmin) {
        Cookies.set("token", data.authToken);
        setUser(decoded?.user);

        navigate("/");
      } else {
        alert("Something went wrong!");
      }
      setLoading(false)
    } catch (err) {
      console.log(err);
      alert("Wrong code!");
      setLoading(false)
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Register bg-gray h-100vh d-flex 
    justify-center align-center">
      <p
        style={{
          position: "absolute",
          top: 20,
          right: window.matchMedia("(max-width: 500px)").matches ? 30 : 50,
          textAlign: "end",
        }}
      >
        Already a member?{" "}
        {window.matchMedia("(max-width: 400px)").matches ? <br /> : ""}
        <Link to="/login" className="bold">
          Login
        </Link>
      </p>
      <div className="w-100">
        <div className="center px-2">
          <Typography.Title
            level={window.matchMedia("(max-width: 400px)").matches ? 3 : 2}
          >
            Get started with Clockify
          </Typography.Title>
          <p className="text-muted">
            Create a free account to start tracking time and supercharge your
            productivity.
          </p>
        </div>
        <Form
          name="normal_login"
          className="login-form mx-auto bg-white px-3 py-3 mt-5 rounded-2 shadow"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <h1 className="mb-3 center">Sign up</h1>
          <div className="input_grid">
          <Form.Item className="mb-0"
            name="fname"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              placeholder="First Name"
              type="text"
              className="py-2 px-3"
              id="fname"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>

          <Form.Item className="mb-0"
            name="lname"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              placeholder="Last Name"
              type="text"
              className="py-2 px-3"
              id="lname"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>

          <Form.Item className="mb-0"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={
                <MailOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              placeholder="Email"
              type="email"
              className="py-2 px-3"
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
<PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      className="py-2 px-3" />

          <Form.Item className="mb-0"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              type="password"
              placeholder="Choose a strong password"
              className="py-2 px-3"
              id="password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          </div>
          <Form.Item className="mb-0 mt-3">
            <div className="d-flex justify-between align-center w-100">
              <Form.Item className="mb-0"
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox>I agree to the Terms of Use</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item className="w-100 center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-100 rounded mt-2"
              size="large"
            >
            {loading ? "Loading..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal title="Verify OTP" open={isModalOpen} onCancel={handleCancel}>
        <Input
          type="number"
          placeholder="Enter OTP code"
          id="otp"
          onChange={(e) => handleChange(e)}
        />
        <Button
          type="primary"
          className="login-form-button mt-2"
          onClick={onVerify}
        >
         {loading ? "Loading..." : "Verify!"} 
        </Button>
      </Modal>
    </div>
  );
};
export default Register;
