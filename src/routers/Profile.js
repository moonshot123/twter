import React from "react";
import { authService } from "Mybase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onClicksignOut = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onClicksignOut}> 로그아웃 </button>
    </>
  );
};

export default Profile;
