import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/auth.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { SearchProvider } from "./Context/search.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider>
      <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  
);
