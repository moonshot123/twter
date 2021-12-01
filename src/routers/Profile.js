import React, { useEffect, useState } from "react";
import { authService, dbService } from "Mybase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onClicksignOut = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTwter = async () => {
    //console.log(userObj);
    try {
      const querySnapshot = await getDocs(
        query(
          collection(dbService, "twters"),
          where("creatorId", "==", userObj.uid),
          orderBy("createdAt")
        )
      );

      console.log(querySnapshot);

      // console.log(
      //   querySnapshot.docs.map((doc) => {
      //     doc.data();
      //   })
      // );

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyTwter();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
    refreshUser();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="display name"
          value={newDisplayName}
        />
        <input type="submit" placeholder="update name" value="수정" />
      </form>

      <button onClick={onClicksignOut}> 로그아웃 </button>
    </>
  );
};

export default Profile;
