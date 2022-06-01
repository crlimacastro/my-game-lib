import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";

import { userState } from "./state";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Favorites from "./components/pages/Favorites";
import NotFound from "./components/pages/NotFound";
import { useEffect } from "react";
import { getUserInSession } from "./api/session";

const App = () => {
  const [, setUser] = useAtom(userState);

  // Get User in session (if any) on App init
  useEffect(() => {
    getUserInSession().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
