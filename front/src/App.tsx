import React from "react";

//navigation
import Routes from "./navigation/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ToastContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
