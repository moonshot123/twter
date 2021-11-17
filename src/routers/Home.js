import React, { useEffect, useState } from "react";
import { dbService } from "Mybase";
import { collection, addDoc, getDocs } from "firebase/firestore";
const Home = () => {
  const [twter, setTwter] = useState("");
  const [twters, setTwters] = useState([]);

  //작성글 가져와서 저장하기
  const getTwter = async () => {
    const getTwterDoc = await getDocs(collection(dbService, "twters"));

    getTwterDoc.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(doc.data());
      setTwters((prev) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    getTwter();
  }, []);

  //폼을통해 글입력
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "twters"), {
        twter,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTwter("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwter(value);
  };

  console.log(twters);
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
        <input type="submit" value="입력" />
      </form>

      <div>
        {twters.map((e, i) => (
          <div key={i}>
            <h4>{e.twter}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
