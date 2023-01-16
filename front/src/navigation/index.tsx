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
import EditProfile from "../pages/EditPhofile";
import Phofire from "../pages/Profile";

//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//routes
import { ROUTES } from "./ROUTES";

function RoutesDestination() {
  const { auth, isLoading } = useContext(AuthContext);
  // useEffect(() => {

  // }, []);
  if (isLoading) {
    return (
      <div>
        <p>carregando</p>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[70vh]">
          <Routes>
            <Route
              path={ROUTES.home}
              element={
                !auth && !isLoading ? <Navigate to={ROUTES.login} /> : <Home />
              }
            />
            <Route
              path={ROUTES.login}
              element={
                !auth && !isLoading ? <Login /> : <Navigate to={ROUTES.login} />
              }
            />
            <Route
              path={ROUTES.register}
              element={
                !auth && !isLoading ? (
                  <Register />
                ) : (
                  <Navigate to={ROUTES.home} />
                )
              }
            />
            <Route
              path={ROUTES.profile}
              element={
                !auth && !isLoading ? (
                  <Navigate to={ROUTES.login} />
                ) : (
                  <EditProfile />
                )
              }
            />
            <Route
              path={ROUTES.user(":id")}
              element={
                !auth && !isLoading ? (
                  <Navigate to={ROUTES.login} />
                ) : (
                  <Phofire />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default RoutesDestination;
