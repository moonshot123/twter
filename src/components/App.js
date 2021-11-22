import { useEffect, useState } from "react";
import AppRouter from "components/Router.js";
import { authService } from "Mybase.js";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);

  //로그인 유저 확인
  //console.log(authService.currentUser);
  const [isLogin, setIsLogin] = useState(authService.currentUser);

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
