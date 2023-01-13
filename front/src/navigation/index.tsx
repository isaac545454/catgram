import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/index";

//pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/index";
import Register from "../pages/Auth/Register/index";
import Profile from "../pages/EditPhofile";

//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//routes
import { ROUTES } from "./ROUTES";

function RoutesDestination() {
  const { auth } = useContext(AuthContext);
  // useEffect(() => {

  // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[70vh]">
          <Routes>
            <Route
              path={ROUTES.home}
              element={auth ? <Home /> : <Navigate to={ROUTES.login} />}
            />
            <Route
              path={ROUTES.login}
              element={!auth ? <Login /> : <Navigate to={ROUTES.login} />}
            />
            <Route
              path={ROUTES.register}
              element={!auth ? <Register /> : <Navigate to={ROUTES.home} />}
            />
            <Route
              path={ROUTES.profile}
              element={auth ? <Profile /> : <Navigate to={ROUTES.login} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default RoutesDestination;
