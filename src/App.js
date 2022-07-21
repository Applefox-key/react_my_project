import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/animation.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, PopupContext } from "./context";
import BaseAPI from "./API/BaseAPI";
import AppRouter from "./components/AppRouter";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [popupSettings, setPopupSettings] = useState([false, "", "success"]);

  useEffect(() => {
    BaseAPI.createDB();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuth(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <PopupContext.Provider value={{ popupSettings, setPopupSettings }}>
        <div className="App">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </PopupContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
