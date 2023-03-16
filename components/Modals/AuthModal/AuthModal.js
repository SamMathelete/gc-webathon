import { Modal, Box, IconButton, Icon, Typography } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { IoCloseOutline } from "react-icons/io5";
import OauthButtons from "./OauthButtons";
import AuthInputs from "./AuthInputs";

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
          bgcolor: "#FFFFFF",
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
          <Typography sx={{ fontSize: 22 }}>
            {modalState.view === "login" ? "Log In" : "Sign Up"}
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <OauthButtons />
          <Typography sx={{ marginY: "20px" }}>OR</Typography>
          <AuthInputs />
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
