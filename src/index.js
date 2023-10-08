import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-utn-frc-iaew.auth0.com"
    clientId="ViijI9UOvRQQJSTRArIT0y2444FFSJ7G"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/callback",
    }}
  >
    <App />
  </Auth0Provider>
);
