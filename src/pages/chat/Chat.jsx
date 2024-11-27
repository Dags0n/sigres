import React, { useState } from 'react';
import ChatBox from '../../components/ChatBox';
import MessageInput from '../../components/MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);  // Estado para armazenar as mensagens

  // Função para adicionar nova mensagem com a hora
  const handleSendMessage = (message) => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;  // Hora no formato HH:mm

    const newMessage = {
      username: "Administrador",  // Pode ser dinamicamente obtido, se necessário
      text: message,
      sender: "user",  // Pode ser "user" ou "admin", dependendo do tipo de mensagem
      time: time,  // Hora da mensagem
    };

    setMessages([...messages, newMessage]); 
  };

  return (
    <div className="chat-container">
      <ChatBox messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
