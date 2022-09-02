import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import Message from "./Message";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const submitMessageHandler = (e) => {
    e.preventDefault();
    if (msg.length === 0) {
      return;
    }
    dispatch(
      userActions.sendMessage({
        userr: currentUser,
        text: msg,
      })
    );
    setMsg("");
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <section className="msger">
      <header className="msger-header">
        {currentUser && (
          <div className="msger-header-title">
            Hello {currentUser.login.toUpperCase()} !
          </div>
        )}
        <div className="msger-header-options">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <Message />

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
