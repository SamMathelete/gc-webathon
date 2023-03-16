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
        style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        style={{ color: "#FFFFFF", backgroundColor: "#639cf7" }}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <AuthModal />
    </Stack>
  );
};
export default AuthButtons;
