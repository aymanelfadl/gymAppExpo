// GlobalState.js
let globalState = {
  serverLink: "http://192.168.1.106:8000/",
  user: null,
};

export const getLink = () => {
  return globalState.serverLink;
};

export const setUser = (user) => {
  return new Promise((resolve) => {
    console.log("ill set : " + user);
    globalState.user = user;
    resolve();
  });
};

export const getUser = () => {
  console.log("ill return  : " + globalState.user);
  return globalState.user;
};
