import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/index";
import Register from "../pages/Auth/Register/index";
import EditProfile from "../pages/EditPhofile";
import Phofire from "../pages/Profile";
import PhotosView from "../pages/photoView";
import Search from "../pages/Search";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./ROUTES";

export const AuthRoutes = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
      </Routes>
    </div>
  );
};

export const RoutesFinish = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.profile} element={<EditProfile />} />
        <Route path={ROUTES.user(":id")} element={<Phofire />} />
        <Route path={ROUTES.photosView(":id")} element={<PhotosView />} />
        <Route path={ROUTES.search(":text")} element={<Search />} />
      </Routes>
    </div>
  );
};
