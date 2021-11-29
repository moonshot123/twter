import React, { useEffect } from "react";
import { authService } from "Mybase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onClicksignOut = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTwter = async () => {
    console.log(userObj);
    try {
      const q = query(
        collection(authService, "twters"),
        where("createdId", "==", userObj.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

      //
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyTwter();
  }, []);

  return (
    <>
      <button onClick={onClicksignOut}> 로그아웃 </button>
    </>
  );
};

export default Profile;
