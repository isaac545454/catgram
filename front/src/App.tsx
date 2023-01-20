import React from "react";

//navigation
import Routes from "./navigation/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/index";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes />
          <ToastContainer theme="colored" />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
