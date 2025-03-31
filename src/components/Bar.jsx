import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const pages = [
  "Emplois du temps",
  "TODO List",
  "Chat académique",
  "PDF",
  "Partage Document",
];
const settings = ["Profile", "Dashboard", "Logout"];

function Bar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Dashboard") {
      navigate("/dashboard");
      } else if (setting === "Profile") {
      navigate("/profile");

    } else if (setting === "Logout") {
      handleLogout();
    }
  };

  const handlePageClick = (page) => {
    if (page === "TODO List") {
      navigate("/todo");
    } else if (page === "Partage Document") {
      navigate("/documents");
    } else if (page === "Chat académique") {
      navigate("/ChatAcad");
    } else if (page === "Emplois du temps") {
      navigate("/emplois");
    }
    else if (page==="PDF"){
      navigate("/courses");
    }
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/signin");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData && userData.nomPrenom) {
        setUser(userData);
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <header>
      <AppBar
        position="fixed"
        className="custom-navbar"
        sx={{ width: "100%", top: 0, left: 0, margin: 0, padding: 0, borderRadius: 0, height: "65px" }}
      >
        <Container maxWidth="xl" sx={{ padding: 0 }}>
          <Toolbar disableGutters className="custom-toolbar">
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                className="custom-menu-button"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Button onClick={() => navigate("./")} sx={{ padding: 0 }}>
              <Box
                component="img"
                sx={{
                  height: 65,
                  width: 60,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="aitudiant"
                src={`${process.env.PUBLIC_URL}/aitudiant.png`}
              />
            </Button>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Arial",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user ? user.nomPrenom : "Guest"}>
                      {user ? user.nomPrenom.charAt(0).toUpperCase() : "G"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button color="inherit" onClick={() => navigate("/signin")}>
                  Se connecter
                </Button>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Bar;