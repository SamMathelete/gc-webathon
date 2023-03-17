import React from "react";
import { Button, Stack } from "@mui/material";
import AuthModal from "../../Modals/Auth/AuthModal";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

const AuthButtons = () => {
  const setModalState = useSetRecoilState(authModalState);

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        style={{ color: "#FFC600", borderColor: "#FFC600" }}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        style={{ color: "black", backgroundColor: "#FFC600" }}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <AuthModal />
    </Stack>
  );
};
export default AuthButtons;
