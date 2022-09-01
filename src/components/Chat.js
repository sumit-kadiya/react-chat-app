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
  const { user } = useParams();
  const { users } = useGlobalContext();

  const [filteredUser] = users.filter((el) => el.id === Number(user));

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

  return (
    <div>
      <div className="navcon">
        {filteredUser && (
          <h2 style={{ margin: 0 }}>
            Hello {filteredUser.login.toUpperCase()} !
          </h2>
        )}
        <button onClick={() => navigate("/")}>Log out</button>
      </div>
      <Message user={filteredUser} />

      <form onSubmit={submitMessageHandler}>
        <div className="sendMsg">
          <input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              borderRadius: "20px",
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            style={{
              width: "15%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "5px",
              padding: " 10px 5px",
              maxWidth: "200px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "#eb4034",
              color: "#fff",
            }}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
