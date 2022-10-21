import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo1 from "../../img/logo2.png";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Albums",
      link: "/albums",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--main-color-blue)",
          marginTop: 1,
          height: "100px",
        }}
        className="brandTitle"
      >
        <img src={logo1} alt="" height="60px" />
        <Typography fontSize="20px" varient="h3" fontWeight={600}>
          MR.FRAD
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding onClick={() => navigate(item.link)}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--main-color-blue)",
                marginTop: 1,
              }}
              className="brandTitle"
            >
              <img src={logo1} alt="" height="60px" />
              <Typography fontSize="20px" varient="h3" fontWeight={600}>
                MR.FRAD
              </Typography>
            </Link>

            <Box
              sx={{
                display: { xs: "none", sm: "block", md: "flex" },
                alignItems: "center",
                gap: "30px",
              }}
            >
              {navItems.map((item, i) => (
                <Link
                  to={item.link}
                  key={i}
                  style={{
                    color: "#fff",
                    display: "flex",
                    textTransform: "uppercase",
                    fontSize: "15px",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ ml: 2, display: { sm: "none" }, justifySelf: "right" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
