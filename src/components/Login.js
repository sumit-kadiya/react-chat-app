import React, { useState } from "react";
import { useGlobalContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  let navigate = useNavigate();

  const { users, alert } = useGlobalContext();

  // console.log(users);
  // console.log(currentUser);

  const submitHandler = (e) => {
    e.preventDefault();
    const [currentUser] = users.filter((el) => el.login === user) || [];
    if (currentUser && user === currentUser.login) {
      console.log("Success");
      navigate(`/${currentUser.id}`);
    } else if (!currentUser) {
      alert("Invalid User");
    }
  };
  return (
    <div className="log-con">
      {alert === "Not Found" ? (
        <h2>Server is not Responding</h2>
      ) : (
        <form className="form-con" onSubmit={submitHandler}>
          <h2>React Chat-Room</h2>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={user}
            onChange={(e) => setUser(e.target.value.toLowerCase())}
          />
          <button>Log-In</button>
        </form>
      )}
    </div>
  );
};

export default Login;
