import { Modal, Box, IconButton, Icon, Typography } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { IoCloseOutline } from "react-icons/io5";
import OauthButtons from "./OauthButtons";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((state) => ({ ...state, open: false }));
  };
  return (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "480px",
          bgcolor: "#1f1f1f",
          outline: "none",
          borderRadius: "5px",
          marginTop: "80px",
          marginX: "10px",
          flex: 2,
        }}
      >
        <Box
          sx={{
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <IconButton onClick={handleClose}>
            <IoCloseOutline />
          </IconButton>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography sx={{ fontSize: 22, color: "white" }}>
            {modalState.view === "login" ? "Log In" : "Sign Up"}
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <OauthButtons />
          <Typography sx={{ marginY: "20px" , color: "white"}}>OR</Typography>
          {modalState.view === "signup" ? <SignUp /> : <LogIn />}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
