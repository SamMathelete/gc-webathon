import * as React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import AuthButtons from "./AuthButtons/AuthButtons";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Icon from "@mdi/react";
import { mdiQuadcopter } from "@mdi/js";
import LogOut from "./AuthButtons/LogOut";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";

const pages = [
  {
    name: "Requests",
    link: "/admin#requests",
  },
  {
    name: "Master Map",
    link: "/admin#master-map",
  },
  {
    name: "Package History",
    link: "/admin#history",
  },
];

function ResponsiveAppBar() {
  const [signOut, signoutLoading, signoutError] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const authCtx = useContext(AuthContext);

  if (user) {
    authCtx.login(user);
  }

  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    router.push(link);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#100F0F" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Icon path={mdiQuadcopter} size={1} color="#FFC600" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FFC600",
              textDecoration: "none",
            }}
          >
            AirBorneX
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu.bind(this, page.link)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Icon path={mdiQuadcopter} size={1} color="#FFC600" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FFC600",
              textDecoration: "none",
            }}
          >
            AirBorneX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu.bind(this, page.link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {!user && <AuthButtons />}
          {user && (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Avatar
                  alt={user.displayName ? user.displayName : "User"}
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </Box>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#FFC600",
                  marginLeft: 10,
                }}
                variant="contained"
                onClick={async () => {
                  await signOut();
                  authCtx.logout();
                }}
              >
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
