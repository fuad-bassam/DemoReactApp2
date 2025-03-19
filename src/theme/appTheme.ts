import { green, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { CssVarsTheme } from "@mui/material/styles";

// Extend the CssVarsTheme to include the `components` property
declare module '@mui/material/styles' {
  interface CssVarsTheme {
    components?: {
      MuiButton?: {
        styleOverrides?: {
          contained?: React.CSSProperties;
        };
      };
    };
  }
}

// Extend the Button variants to include 'danger' and 'dashed'
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    danger: true; // Adds 'danger' as a valid variant
    dashed: true; // Adds 'dashed' as a valid variant
  }
}

export const appTheme = createTheme({
  palette: {
    primary: green,
    secondary: pink,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "16px", // Default for all buttons
          padding: "10px 20px", // Default padding for buttons
          textTransform: "none", // Prevents uppercase text by default
        },
        contained: {
          // Example style for the 'contained' variant
          backgroundColor: green[500],
          color: "#ffffff",
          "&:hover": {
            backgroundColor: green[700],
          },
        },
      },
      variants: [
        {
          // Custom variant: 'danger'
          props: { variant: "danger" },
          style: {
            backgroundColor: "#f44336", // Red color
            color: "white",
            "&:hover": {
              backgroundColor: "#d32f2f", // Darker red on hover
            },
          },
        },
        {
          props: { variant: "dashed" },
          style: ({ theme }) => ({
            // Now TypeScript recognizes `theme.components`
            ...theme.components?.MuiButton?.styleOverrides?.contained,
            border: "2px dashed",
          }),
        },
      ],
    },
  },
});