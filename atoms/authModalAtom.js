import { atom } from "recoil";

const defaultState = {
  open: false,
  view: "login",
};

export const authModalState = atom({
  key: "authModalState",
  default: defaultState,
});
