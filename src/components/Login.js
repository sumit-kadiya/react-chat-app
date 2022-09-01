import React, { useState } from "react";
import { useGlobalContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const Login = () => {
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, alertMsg } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
    const [currentUser] = users.filter((el) => el.login === user) || [];
    if (currentUser && user === currentUser.login) {
      dispatch(userActions.login());
      navigate(`/${currentUser.id}`);
    } else if (user === "") {
      alert("Please enter username");
    } else {
      alert("Invalid user");
    }
  };
  return (
    <div className="log-con">
      {alertMsg === "Not Found" ? (
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
