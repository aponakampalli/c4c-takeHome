import "./App.css";
import { Box, createTheme, ThemeProvider, TextField } from "@mui/material";
import { useState } from "react";

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
        }}
      >
        <TextField id="outlined-basic" variant="outlined" />

      </Box>
    </ThemeProvider>
  );
}

export default App;
