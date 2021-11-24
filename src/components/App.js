import { useEffect, useState } from "react";
import AppRouter from "components/Router.js";
import { authService } from "Mybase.js";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);

  //로그인 유저 확인
  //console.log(authService.currentUser);
  //Boolean(userObj)을 이용하여 랜더 줄이기
  const [isLogin, setIsLogin] = useState(authService.currentUser);

  //유저정보
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    //setIsLogin(authService.currentUser);
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserObj(user);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        //<AppRouter isLogin={Boolean(userObj)} userObj={userObj} />
        <AppRouter isLogin={isLogin} userObj={userObj} />
      ) : (
        <>
          <span> 준비중 </span>
        </>
      )}

      <footer>&copy; twter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
