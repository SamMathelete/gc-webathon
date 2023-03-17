import React, { useState } from "react";
import { Stack, TextField, Box, Button, FormControl } from "@mui/material";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const LogIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const setModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    const res = await signInWithEmailAndPassword(email, password);
    console.log(res);
    setModalState((state) => ({ ...state, open: false }));
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        marginX: "20px",
      }}
      spacing={3}
    >
      <TextField
        id="email"
        variant="outlined"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ background: "white", borderRadius: "5px" }}
      />
      <TextField
        id="password"
        variant="outlined"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ background: "white", borderRadius: "5px" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ height: "40px", background: "#FFC600", color: "black"  }}
          onClick={handleLogIn}
        >
          Log In
        </Button>
      </Box>
    </Stack>
  );
};

export default LogIn;
