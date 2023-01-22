import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/index";

//
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/index";
import Register from "../pages/Auth/Register/index";
import EditProfile from "../pages/EditPhofile";
import Phofire from "../pages/Profile";
import PhotosView from "../pages/photoView";
import Search from "../pages/Search";

//
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { ROUTES } from "./ROUTES";

function RoutesDestination() {
  const { auth, isLoading } = useContext(AuthContext);

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
            <Route
              path={ROUTES.photosView(":id")}
              element={
                !auth && !isLoading ? (
                  <Navigate to={ROUTES.login} />
                ) : (
                  <PhotosView />
                )
              }
            />
            <Route
              path={ROUTES.search(":text")}
              element={
                !auth && !isLoading ? (
                  <Navigate to={ROUTES.login} />
                ) : (
                  <Search />
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
