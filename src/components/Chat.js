import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../store/userContext";
import { userActions } from "../store/userSlice";
import Message from "./Message";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID } = useParams();
  const { users } = useGlobalContext();

  const [filteredUser] = users.filter((el) => el.id === Number(userID));

  const submitMessageHandler = (e) => {
    e.preventDefault();
    if (msg.length === 0) {
      return;
    }
    dispatch(
      userActions.sendMessage({
        userr: filteredUser,
        text: msg,
      })
    );
    setMsg("");
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate("/");
  };

  return (
    <section className="msger">
      <header className="msger-header">
        {filteredUser && (
          <div className="msger-header-title">
            Hello {filteredUser.login.toUpperCase()} !
          </div>
        )}
        <div className="msger-header-options">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <Message user={filteredUser} />

      <form className="msger-inputarea" onSubmit={submitMessageHandler}>
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="msger-send-btn">
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;
