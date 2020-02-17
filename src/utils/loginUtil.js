import loginStore from "../login/loginStore";

export function isLoggedIn() {
  return loginStore.getState();
}
