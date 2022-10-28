import { Facebook, Instagram, Reddit, Twitter } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../img/logo2.png";

const Footer = () => {
  return (
    <Box bgcolor="#202020">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 16 }}
        borderBottom="1px solid #333333"
      >
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          borderRight="1px solid #333333"
          borderBottom={{ xs: "1px solid #333333", sm: "1px solid #333333" }}
          paddingBottom="25px"
        >
          <Box display="flex" justifyContent="center">
            <Link to="/">
              <Twitter sx={{ color: "#1da1f2" }} fontSize="large" />
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          borderRight="1px solid #333333"
          borderBottom={{ xs: "1px solid #333333", sm: "1px solid #333333" }}
          paddingBottom="25px"
        >
          <Box display="flex" justifyContent="center">
            <a
              href="https://www.instagram.com/mr._.frad"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram sx={{ color: "#e700b5" }} fontSize="large" />
            </a>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          borderRight="1px solid #333333"
          paddingBottom="25px"
        >
          <Box display="flex" justifyContent="center">
            <Link to="/">
              <Facebook sx={{ color: "#008ce4" }} fontSize="large" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4} paddingBottom="25px">
          <Box display="flex" justifyContent="center">
            <Link to="/">
              <Reddit sx={{ color: "#e65015" }} fontSize="large" />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={2.5}
        borderBottom="1px solid #333333"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
          gap={{ xs: "15px", sm: "20px" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Link to="/" style={{ fontSize: "16px", fontWeight: "bold" }}>
            Home
          </Link>
          <Link to="/albums" style={{ fontSize: "16px", fontWeight: "bold" }}>
            Albums
          </Link>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={2}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--main-color-blue)",
              marginTop: 1,
            }}
          >
            <img src={logo1} alt="" height="60px" />
            <Typography
              fontSize="20px"
              varient="h3"
              fontWeight={600}
              sx={{ fontFamily: "Raleway" }}
            >
              MR.FRAD
            </Typography>
          </Link>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
          gap={{ xs: "15px", sm: "20px" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Link to="/about" style={{ fontSize: "16px", fontWeight: "bold" }}>
            About
          </Link>
          <Link to="/contact" style={{ fontSize: "16px", fontWeight: "bold" }}>
            Contact
          </Link>
        </Box>
      </Box>

      <Box padding={2}>
        <Typography
          variant="body2"
          fontSize={{ xs: "14px", sm: "15px" }}
          textAlign="center"
        >
          Copyright © {new Date().getFullYear()} | All Rights Reserved | Made by{" "}
          <a
            href="https://itsabishiek.vercel.app"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#349eff", fontWeight: 600 }}
          >
            Abishiek
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
