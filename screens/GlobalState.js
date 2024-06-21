// GlobalState.js
let globalState = {
  serverLink: "https://4781-160-178-81-241.ngrok-free.app/",
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
