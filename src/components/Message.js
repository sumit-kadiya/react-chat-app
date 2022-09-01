import React from "react";
import { useSelector } from "react-redux";

const Message = ({ user }) => {
  const messages = useSelector((state) => state.user.messages);

  return (
    <div className="msgs">
      {messages.length > 0 ? (
        messages.map((el, index) => (
          <div key={index}>
            <div
              key={index}
              className={`msg ${el.userr.id === user.id ? "sent" : "received"}`}
            >
              <img src={el.userr.avatar_url} alt="" />
              <p>{el.text}</p>
            </div>
          </div>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>No Messages to show</h3>
      )}
    </div>
  );
};

export default Message;
