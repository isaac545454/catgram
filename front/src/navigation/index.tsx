import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//routes
import { ROUTES } from "./ROUTES";

function RoutesDestination() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.register} element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default RoutesDestination;
