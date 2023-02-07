import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setUser, setAdmin } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/auth/login",
        values.email,
        values.password
      );
      if (data.success) {
        var decoded = jwt_decode(data.authToken);
        localStorage.setItem("token", data.authToken);
        setUser(data.authToken);
        if (decoded.user.isAdmin) {
          setAdmin(true);
        } else setAdmin(false);
        navigate("/");
      }
    } catch (err) {
      alert(err?.response.data.msg);
    }
  };

  return (
    <div className="bg-gray h-100vh d-flex justify-center align-center">
      <Form
        name="normal_login"
        className="login-form mx-auto bg-white px-3 py-3 rounded-2 shadow"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <h1 className="mb-3 center">Login</h1>
        <Form.Item
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
              <UserOutlined
                className="site-form-item-icon"
                style={{ fontSize: "18px" }}
              />
            }
            placeholder="Email"
            type="email"
            className="py-2 px-3"
          />
        </Form.Item>
        <Form.Item
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
            placeholder="Password"
            className="py-2 px-3"
          />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-between align-center w-100">
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
              className=""
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <Link to={"/forgot"} className="login-form-forgot">
              Forgot password
            </Link> */}
          </div>
        </Form.Item>

        <Form.Item className="w-100 center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-100 rounded"
            size="large"
          >
            Log in
          </Button>
          {/* <p className="my-2">Or</p>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register Now!
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
