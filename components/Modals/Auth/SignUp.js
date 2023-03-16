import React, { useState } from "react";
import { Button, Stack, TextField, Box, Typography } from "@mui/material";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorText, setErrorText] = useState(" ");

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      setErrorText("Password does not match");
      return;
    }
    const userCredentials = await createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(userCredentials);
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        variant="outlined"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box>
        <TextField
          id="password_confirm"
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Typography sx={{ color: "red", fontSize: "12px", margin: "2px" }}>
          {errorText}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        <Button
          variant="contained"
          sx={{ height: "40px" }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Box>
    </Stack>
  );
};

export default SignUp;
