export const fetchGoogle = () => {
  const userInfo =
    localStorage.getItem("google") !== "undefined"
      ? JSON.parse(localStorage.getItem("google"))
      : localStorage.clear();
  return userInfo;
};

export const fetchUser = () => {
  const userlogin =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userlogin;
};
