import { useEffect, useState } from "react";
import AppRouter from "components/Router.js";
import { authService } from "Mybase.js";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);

  //로그인 유저 확인
  //console.log(authService.currentUser);
  //Boolean(userObj)을 이용하여 랜더 줄이기
  const [isLogin, setIsLogin] = useState(authService.currentUser);

  //유저정보
  const [userObj, setUserObj] = useState(null);

  const getAuth = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    //setIsLogin(authService.currentUser);
    getAuth();
  }, []);

  const refreshUser = () => {
    getAuth();
    //setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        //<AppRouter isLogin={Boolean(userObj)} userObj={userObj} />
        <AppRouter
          refreshUser={refreshUser}
          isLogin={isLogin}
          userObj={userObj}
        />
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
