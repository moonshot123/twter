import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "Mybase";
import { useState } from "react";

export const Twter = ({ itemObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwter, setNewTwter] = useState(itemObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    console.log(ok);

    //true 삭제
    if (ok) {
      const twterRef = doc(dbService, "twters", `${itemObj.id}`);
      await deleteDoc(twterRef);
      alert("삭제성공");
    } else {
      alert("삭제실패");
    }
  };

  const onEditClick = () => {
    setEditing((prev) => !prev);
    setNewTwter(itemObj.text);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTwter(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(itemObj, newTwter);
    const twterRef = doc(dbService, "twters", `${itemObj.id}`);
    await updateDoc(twterRef, {
      text: newTwter,
    });
    setEditing((prev) => !prev);
  };

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="글을 수정하세요."
              value={newTwter}
              onChange={onChange}
            />
            <input type="submit" value="Update Twter" />
          </form>
          <button onClick={onEditClick}>Cancel</button>
        </>
      ) : (
        <>
          <div key={itemObj.id}>
            <h4>{itemObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={onEditClick}>edit</button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
