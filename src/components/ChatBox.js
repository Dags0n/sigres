import React, { useEffect, useRef } from 'react';
import './ChatBox.css';
import { getUsername } from '../services/authService';

const ChatBox = ({ messages }) => {
  // Ref para o container da chatbox
  const chatBoxRef = useRef(null);

  const isMyMessage = (name) => {
    const username = getUsername();
    if (username.includes(name) && name.includes(username)) {
      return "user";
    } else {
      return "admin";
    }
  };

  // Função para rolar para o final da chatbox sempre que as mensagens mudarem
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);  // A cada mudança nas mensagens, o efeito é acionado

  return (
    <div className="chatbox" ref={chatBoxRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${isMyMessage(msg.sentBy.username)}`}>
          <div className="message-header">
            <span className="username">{msg.sentBy.username}</span>
            <span className="message-time">({msg.sentAt})</span>
          </div>
          <span>{msg.body}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
