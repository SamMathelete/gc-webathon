import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { doc, setDoc } from "firebase/firestore";

const OauthButtons = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const setAuthModalState = useSetRecoilState(authModalState);
  const handleLogin = async () => {
    const userCred = await signInWithGoogle();
    if (userCred) {
      createUserDoc(userCred.user);
    }
    setAuthModalState((state) => ({ ...state, open: false }));
  };
  const createUserDoc = async (user) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    console.log("updated user");
  };

  return (
    <Button variant="outlined" onClick={handleLogin} sx={{ height: "40px" }}>
      Sign in with Google
    </Button>
  );
};

export default OauthButtons;
