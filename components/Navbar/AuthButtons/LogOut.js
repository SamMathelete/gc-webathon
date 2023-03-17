import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { Button } from "@mui/material";

const LogOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <Button variant="contained" onClick={async () => await signOut()}>
      Log Out
    </Button>
  );
};
export default LogOut;
