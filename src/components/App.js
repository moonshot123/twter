import { useState } from "react";
import Router from "./Router.js";
import firebase from "../firebase.js";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Router isLogin={isLogin} />
      <footer>&copy; twter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
