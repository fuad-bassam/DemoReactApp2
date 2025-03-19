import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import { NavRoutes } from "./Services/Common/NavRoutes";
import { SnackbarProvider } from './hooks/SnackbarContext';
import { DialogProvider } from './hooks/DialogContext';
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../src/theme/appTheme";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <DialogProvider>

          <ThemeProvider theme={appTheme}>

            <RouterProvider router={NavRoutes} />
          </ThemeProvider>

        </DialogProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
