import { Box, Button, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import logo1 from "../../../img/logo2.png";
import "./AdminLogin.css";

const AdminLogin = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (
      email === process.env.REACT_APP_ADMIN_USERNAME &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setAuth(true);
      Cookies.set("admin", email);
    } else {
      setError(true);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      padding="0px 20px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <img src={logo1} alt="" height="100px" />
        <Typography
          variant="h1"
          fontSize="24px"
          fontWeight={700}
          color="primary"
          mb={3}
        >
          Login
        </Typography>

        <Box
          gap="20px"
          display="flex"
          flexDirection="column"
          sx={{ width: { xs: "100%", sm: "100%", md: "30%" } }}
        >
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ color: "#fafafa", fontWeight: 500 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {error && (
            <Typography
              variant="h4"
              sx={{ color: "red", fontSize: "18px", textAlign: "center" }}
            >
              Wrong Credencials!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
