import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/index";
import { AuthRoutes, RoutesFinish } from "./auth";
//
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
          {auth ? <RoutesFinish /> : <AuthRoutes />}
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default RoutesDestination;
