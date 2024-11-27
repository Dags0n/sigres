import React from 'react';
import './ChatBox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <div className="message-header">
            <span className="username">{msg.username}</span>
            <span className="message-time">{msg.time}</span>
          </div>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
