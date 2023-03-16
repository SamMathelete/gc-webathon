import { atom } from "recoil";

const defaultState = {
  open: false,
  view: "signup",
};

export const authModalState = atom({
  key: "authModalState",
  default: defaultState,
});
