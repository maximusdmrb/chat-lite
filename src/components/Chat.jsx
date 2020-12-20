import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './css/Chat.css';

export default function Chat({ users }) {
  const [message, setMessage] = useState('');

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
          <div className="block-message">
            <p className="text-message">
              <span className="user">
                <b>Max:</b>
              </span>{' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, facilis!
            </p>
            <span className="time-message">12:24</span>
          </div>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            name=""
            id=""
            rows="2"></textarea>
          <Button onClick={() => alert(message)} varian="primary">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
}
