import { atom } from "recoil";

const defaultState = {
  open: false,
};

export const historyModalState = atom({
  key: "historyModalState",
  default: defaultState,
});
