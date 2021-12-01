import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "Mybase";

import AuthForm from "components/AuthForm";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async (event) => {
    //console.log(event.target);
    const {
      target: { name },
    } = event;

    let provider;
    let data;
    try {
      if (name === "logingoogle") {
        provider = new GoogleAuthProvider();
      } else if (name === "loginemail") {
        provider = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }

      data = await signInWithPopup(authService, provider);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AuthForm />
      <button name="logingoogle" onClick={onLoginClick}>
        구글아이디로 로그인하기
      </button>
      <button name="loginemail" onClick={onLoginClick}>
        이메일로 로그인하기
      </button>
    </>
  );
};

export default Auth;
