import React from "react";
import { Stack, Button } from "@mui/material";
import AuthButtons from "./AuthButtons/AuthButtons";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const Navbar = () => {
  const [signOut, signoutLoading, signoutError] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      height="50px"
      alignItems="center"
      bgcolor="#FFFFFF"
      paddingX="7px"
    >
      {user ? (
        <Button variant="contained" onClick={async () => await signOut()}>
          Log Out
        </Button>
      ) : (
        <AuthButtons />
      )}
    </Stack>
  );
};

export default Navbar;
