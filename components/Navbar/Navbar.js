import React from "react";
import { Stack, Button } from "@mui/material";
import AuthButtons from "./AuthButtons/AuthButtons";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      height="50px"
      alignItems="center"
      bgcolor="#FFFFFF"
      paddingX="7px"
    >
      <AuthButtons />
    </Stack>
  );
};

export default Navbar;
