import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";

const Admin = ({ setAuth }) => {
  const handleLogout = () => {
    setAuth(false);
    Cookies.remove("admin");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="20px"
    >
      <Typography variant="h3" fontSize="24px">
        Admin
      </Typography>
      <Button
        variant="contained"
        sx={{ color: "aliceblue" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Admin;
