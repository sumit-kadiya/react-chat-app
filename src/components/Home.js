import React, { useState } from "react";
import { useGlobalContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const Home = () => {
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, alertMsg } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
    const [currentUser] = users.filter((el) => el.login === user.toLowerCase());
    if (currentUser && user.toLowerCase() === currentUser.login) {
      dispatch(userActions.login(currentUser));
      navigate(`/${currentUser.id}`);
    } else if (user === "") {
      alert("Please enter username");
    } else {
      alert("Invalid user");
    }
  };
  return (
    <div className="login-page">
      <div className="form">
        {alertMsg ? (
          <h2>Server is not Responding</h2>
        ) : (
          <form className="login-form" onSubmit={submitHandler}>
            <h2>React Chat</h2>
            <input
              name="username"
              type="text"
              placeholder="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button>Log-In</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
