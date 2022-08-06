import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, SyncOutlined } from "@ant-design/icons";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  authCreateUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useRouter } from "next/router";

import LoginForm from "./login";
import RegisterForm from "./register";

const Auth = () => {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInAuthUserWithEmailAndPassword(loginEmail, loginPassword);
      router.push("/");
      toast.success("Login successful");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      setLoading(false);
      toast.error(`Login error: ${error.message}`);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!registerEmail || !registerPassword) {
        toast.error("Email and password are required.");
        return;
      }
      if (registerPassword !== confirmRegisterPassword) {
        toast.error("Passwords must match");
        return;
      }

      await authCreateUserWithEmailAndPassword(registerEmail, registerPassword);
      router.push("/");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmRegisterPassword("");

      toast.success("Registration successful");
    } catch (error) {
      setLoading(false);
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmRegisterPassword("");
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const googleLogin = async () => {
    await signInWithGooglePopup()
      .then((user) => {
        console.log("LOGIN", user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center pt-4 mb-5">
        {loading ? (
          <SyncOutlined spin className="text-danger" />
        ) : (
          "Login / Register"
        )}
      </h2>
      <Button
        onClick={googleLogin}
        className="mb-3 col-md-6 offset-md-3"
        type="danger"
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        Login with Google
      </Button>
      <div className="row">
        <LoginForm
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
        />
        <RegisterForm
          registerEmail={registerEmail}
          registerPassword={registerPassword}
          confirmRegisterPassword={confirmRegisterPassword}
          setConfirmRegisterPassword={setConfirmRegisterPassword}
          setRegisterEmail={setRegisterEmail}
          setRegisterPassword={setRegisterPassword}
          handleRegister={handleRegister}
        />
      </div>
      <div className="d-flex">
        <Link href="/auth/reset-password">
          <a className="btn btn-outline-danger btn-sm mt-5">Reset Password</a>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
