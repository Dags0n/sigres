import React, { useState } from 'react';
import './MessageInput.css'

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);  // Envia a mensagem para o componente pai
      setMessage("");  // Limpa o campo de entrada
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default MessageInput;
