import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState("");

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
        setUsers([]);
        console.log(error.message);
      });
  }, []);

  const userContext = {
    users,
    alert,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
