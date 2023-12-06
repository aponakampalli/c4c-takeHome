import "./App.css";
import { Box, createTheme, ThemeProvider, TextField } from "@mui/material";
import { useState } from "react";
import MessageBoard from "./components/MessageBoard";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px"
        }}
      >
        <h1>Welcome Message Board!</h1>
      <MessageBoard/>

      </Box>
    </ThemeProvider>
  );
}

export default App;
