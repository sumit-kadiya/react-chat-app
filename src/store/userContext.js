import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        setUsers(userData);
        console.log(userData);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const userContext = {
    users,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
