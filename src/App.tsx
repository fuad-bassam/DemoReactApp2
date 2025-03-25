import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { SnackbarProvider } from './Context/SnackbarContext';
import { DialogProvider } from './Context/DialogContext';
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../src/theme/appTheme";
import { NavRoutes } from "./routes/NavRoutes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider>
          <DialogProvider>
            <RouterProvider router={NavRoutes} />
          </DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
