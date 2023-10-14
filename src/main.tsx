import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globla.css";
import { ThemeProvider } from "./context/theme/ThemeContext.tsx";
import { LanguageProvider } from "./context/language/LanguageProvider.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import "./lib/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
