import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import logo from "./images/login/logo.png";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";

import "./CSS/login.css";

const Login = (e) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = async (e) => {
    e.preventDefault();
    const json = { email, password };

    console.log("Success:", json);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <img src={logo} alt="LOGO" />
        {/* <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="form-container"
            label="Email"
            name="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              placeholder="Enter your Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <form className="login-form-container">
          <div className="form-block">
            <label className="login-form-label">Email </label>
            <br />
            <input
              className="login-input"
              type="email"
              name=""
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-block">
            <label className="login-form-label">Password </label>
            <br />

            <input
              className="login-input"
              type="password"
              name=""
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={onFinish}>Login to your account</button>
        </form>
      </div>
      <div className="waves">
        <img src={wave1} alt="" className="wave-svg1" />
        <img src={wave2} alt="" className="wave-svg2" />
      </div>
    </div>
  );
};

export default Login;
