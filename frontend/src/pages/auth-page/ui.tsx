import React, { useLayoutEffect } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { LOGIN } from "shared/api/constants";
import type { FieldType, RegisterResponse } from "pages/model";
import { request } from "shared";
import { useMyContext } from "app/provider";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from './index.module.css'

export const AuthPage: React.FC = () => {
  
  const [error, setError] = React.useState<string | null>(null);
  const { setRouter } = useMyContext();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { router } = useMyContext();

  useLayoutEffect(() => {
    if (router || token) {
      navigate("/", { replace: true });
    }
  }, [router, token, navigate]);
if (router || token) {
    return null;
  }
const onSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
  try {
    const {data} = await request<RegisterResponse>(LOGIN, "POST", {
      login: values.login,
      password: values.password,
    });

    if (data?.error) {
      throw new Error(data.error);
    }

    setRouter(true);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Login error:", error);
    setError(error instanceof Error ? error.message : "Unknown error");
  }
};

  return (
    <>
      {error && (
        <Alert
          message="Error authenticated"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className={styles.alert}
        />
      )}
      <Form
        className={styles.form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
        onChange={() => setError(null)}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form.Item<FieldType>
          label="Login"
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Link style={{ color: "#256f18" }} to="/register">
            Don't have an account?
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
