import React from "react";
import { Button, Stack } from "@mui/material";
import AuthModal from "../../Modals/AuthModal/AuthModal";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

const AuthButtons = () => {
  const setModalState = useSetRecoilState(authModalState);
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <AuthModal />
    </Stack>
  );
};
export default AuthButtons;
