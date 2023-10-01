import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const Chat = () => {
  // Define your state variables within the component
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3001/', {
      transports: ['websocket'],
    });
    
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // socket.emit('handleJoinTopic', { topicId: '1' });
      socket.emit('handleJoinTopic', { topicId: '1' }); // Replace with the actual topic ID
    });

    socket.on('chat', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('chatHistory', (chatHistory) => {
      // Handle chat history (old messages)
      setMessages(chatHistory);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      const messageData = {
        topic: '1', // Replace with the actual topic
        username: 'qwer2', // Replace with the actual username
        message: inputMessage,
      };
      socket.emit('handleChatMessage', messageData);
      setInputMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user.username}:</strong> {message.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
