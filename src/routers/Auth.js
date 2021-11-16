import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "Mybase";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    console.log("확인 :" + event.target.name);
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    //preventDefault 를 사용하지 않는다면 form에서 submit 함수를 사용할때마다
    //새로고침이 되며 state또한 사라지는 것을 확인 할수 있는데
    //이벤트시 preventDefault를 사용하여 아무런 작동도 하지 않도록 하는것으로
    //작성자의도대로만 작성 할수 있는 것이다.
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        //계정생성
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
      </form>

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
