// GlobalState.js
let globalState = {
<<<<<<< HEAD
    user: null,

    serverLink:"http://192.168.11.103:8000/",
=======
  user: null,
  serverLink: "http://192.168.1.105:8000/",
>>>>>>> 01c36499f0880d5a66b03f1dbcce8ea56c5391d9
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
