import React, { useState } from "react";
import { useGlobalContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  let navigate = useNavigate();

  const { users } = useGlobalContext();

  // console.log(users);
  const [currentUser] = users.filter((el) => el.login === user);
  // console.log(currentUser);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentUser && user === currentUser.login) {
      console.log("Success");
      navigate(`/${currentUser.id}`);
    } else {
      alert("Invalid User");
    }
  };
  return (
    <div className="log-con">
      <form className="form-con" onSubmit={submitHandler}>
        <h2>React Chat-Room</h2>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={user}
          onChange={(e) => setUser(e.target.value.toLowerCase())}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Login;
