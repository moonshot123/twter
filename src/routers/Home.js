import React, { useEffect, useState } from "react";
import { dbService } from "Mybase";
import { Twter } from "components/Twter";
import { collection, query, onSnapshot } from "firebase/firestore";

import TwterFactory from "components/TwterFactory";
const Home = ({ userObj }) => {
  //console.log(userObj);
  const [twters, setTwters] = useState([]);

  //getDocs를 사용하여 작성글 가져와서 저장하기
  // const getTwter = async () => {
  //   const getTwterDoc = await getDocs(collection(dbService, "twters"));
  //   getTwterDoc.forEach((doc) => {
  //     //console.log(`${doc.id} => ${doc.data()}`);
  //     //console.log(doc.data());
  //     setTwters((prev) => [...prev, { ...doc.data(), id: doc.id }]);
  //   });
  // };

  useEffect(() => {
    //getTwter();
    //snapshot을 이용하는 리얼타임 데이터 관리
    const q = query(collection(dbService, "twters"));

    onSnapshot(q, (snapshot) => {
      const twterArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwters(twterArr);
    });
  }, []);

  //폼을통해 글입력

  //console.log(twters);
  return (
    <>
      <TwterFactory userObj={userObj} />
      <div>
        {twters.map((item, i) => (
          <Twter
            itemObj={item}
            key={i}
            isOwner={item.createdId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
