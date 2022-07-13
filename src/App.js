import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context";
import BaseAPI from "./API/BaseAPI";
import AppRouter from "./components/AppRouter";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    BaseAPI.createDB();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuth(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <div className="App">
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
