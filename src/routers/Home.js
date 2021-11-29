import React, { useEffect, useState } from "react";
import { dbService } from "Mybase";
import { Twter } from "components/Twter";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getStorage,
  getDownloadURL,
} from "@firebase/storage";
import { storageService } from "Mybase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  //console.log(userObj);
  const [twter, setTwter] = useState("");
  const [twters, setTwters] = useState([]);
  const [attachment, setAttachment] = useState("");

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
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (twter) {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        let attachmentUrl = "";
        attachmentUrl = await getDownloadURL(response.ref);

        console.log("attachmentUrl 있음확인");
        const docRef = await addDoc(collection(dbService, "twters"), {
          text: twter,
          createdAt: Date.now(),
          createdId: userObj.uid,
          attachmentUrl,
        });

        console.log("Document written with ID: ", docRef.id);
      } else {
        alert("글을 입력해주세요.");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTwter("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwter(value);
  };

  const onFileChange = (event) => {
    //console.log(event.target.files);
    const {
      target: { files },
    } = event;

    const imgFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(imgFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  //console.log(twters);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={twter}
          type="text"
          placeholder="글을 입력하세요."
          maxLength={120}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="입력" />
        {attachment && <img src={attachment} width="50px" height="50px" />}

        {attachment && <button onClick={onClearAttachment}>clear</button>}
      </form>

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
