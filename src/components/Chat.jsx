import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import socket from '../socket';
import './css/Chat.css';

export default function Chat({ roomId, userName, users, messages, addMessage }) {
  document.title = userName;
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    socket.emit('ROOM:SET_MESSAGES', { userName, roomId, text: message });
    addMessage({ userName, text: message });
    setMessage('');
  };
  return (
    <>
      <h1>Чат</h1>
      <div className="content">
        <div className="users">
          <ul>
            <li>Users: ({users.length})</li>
            {users.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="chat">
          {messages.map((message) => (
            <div key={message.text + message.userName} className="block-message">
              <p className="text-message">
                <span className="user">
                  <b>{message.userName}</b>
                </span>{' '}
                {message.text}
              </p>
              <span className="time-message">12:24</span>
            </div>
          ))}
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            name=""
            id=""
            rows="2"></textarea>
          <Button onClick={sendMessage} varian="primary">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
}
