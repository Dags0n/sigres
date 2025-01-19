import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import MessageInput from '../../components/MessageInput';
import { getUserId } from '../../services/authService';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const userId = getUserId();

  // Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem('token'); // Recupera o token do localStorage
  };

  // Carregar mensagens ao montar o componente
  useEffect(() => {
    const getMessages = async () => {
      const token = getToken(); // Obtém o token

      try {
        const response = await fetch('http://localhost:8080/chat', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Erro ao obter mensagens');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      }
    };

    getMessages();
  }, []); // Agora o useEffect tem o array vazio e só roda uma vez

  // Função para enviar uma nova mensagem
  const handleSendMessage = async (messageText) => {
    if (messageText.trim()) {
      const token = getToken(); // Obtém o token

      const newMessage = {
        userId: userId, // Defina o ID do usuário
        body: messageText, // Texto da mensagem
      };

      try {
        const response = await fetch('http://localhost:8080/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
          body: JSON.stringify(newMessage),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages([...messages, data]); // Adiciona a mensagem ao estado
        } else {
          console.error('Erro ao enviar mensagem');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <ChatBox messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
