import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#349eff",
    },
  },
  zIndex: {
    appBar: 100,
  },
});

export default darkTheme;
