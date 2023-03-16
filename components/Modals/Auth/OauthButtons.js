import { Button } from "@mui/material";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const OauthButtons = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleLogin = async () => {
    await signInWithGoogle();
    setAuthModalState((state) => ({ ...state, open: false }));
  };

  return (
    <Button variant="outlined" onClick={handleLogin} sx={{ height: "40px" }}>
      Sign in with Google
    </Button>
  );
};

export default OauthButtons;
