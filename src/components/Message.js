import React from "react";
import { useSelector } from "react-redux";

const Message = ({ user }) => {
  const messages = useSelector((state) => state.user.messages);

  return (
    <div className="msgs">
      {messages.length > 0 ? (
        messages.map((el, index) => (
          <main className="msger-chat" key={index}>
            <div
              className={`msg ${
                el.userr.id === user.id ? "right-msg" : "left-msg"
              }`}
            >
              <img className="msg-img" src={el.userr.avatar_url} alt="user" />

              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">{el.userr.login}</div>
                </div>

                <div className="msg-text">{el.text}</div>
              </div>
            </div>
          </main>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>No Messages to show</h3>
      )}
    </div>
  );
};

export default Message;
