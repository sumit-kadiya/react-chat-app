import { useState, createContext, useContext, useEffect } from "react";

const getLocalMsgs = () => {
  let list = localStorage.getItem("messages");

  if (list) {
    return JSON.parse(localStorage.getItem("messages"));
  } else {
    return [];
  }
};

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState(getLocalMsgs());
  const [alertMsg, setAlert] = useState("");

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        setUsers(userData);
        setAlert(userData.message);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendMessage = (msg) => {
    setMessages([...messages, msg]);
  };
  const loginHandler = (user) => {
    setIsAuth(true);
    setUser(user);
  };
  const logoutHandler = () => {
    setIsAuth(false);
    setUser({});
  };

  const userContext = {
    users,
    user,
    alertMsg,
    messages,
    isAuth,
    sendMessage,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
