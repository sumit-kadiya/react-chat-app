import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [alertMsg, setAlert] = useState("");

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

  const userContext = {
    users,
    alertMsg,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
