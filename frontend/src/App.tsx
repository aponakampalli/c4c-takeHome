import "./App.css";
import { Box, createTheme, ThemeProvider, Container } from "@mui/material";
import { useState } from "react";
import MessageBoard from "./components/MessageBoard";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
  },
});

const containerStyle = {
  backgroundImage: `url(${require("./images/background.jpg")})`,

  flexDirection: 'column',
  minHeight: '100vh',
  backgroundSize: 'cover',
  display: 'flex',

};

function App() {
  return (
    <ThemeProvider theme={theme}>
      
        <Box sx={containerStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "100px"
            }}
          >
            <h1>Welcome Message Board!</h1>
            <MessageBoard />
          </Box>
        </Box>
    </ThemeProvider>
  );
}

export default App;
