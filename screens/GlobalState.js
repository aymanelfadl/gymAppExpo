// GlobalState.js
let globalState = {
  user: null,
  serverLink: "http://192.168.1.105:8000/",
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
export const getLink = () => {
  return globalState.serverLink;
};
