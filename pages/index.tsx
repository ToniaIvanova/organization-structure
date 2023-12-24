import React, { useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material";
import { MainPage } from "@/components/MainPage";

const Home: React.FC = () => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <MainPage />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Home;
