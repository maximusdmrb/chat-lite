import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function Join({ onLogin }) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !name) {
      return alert('Введите данные');
    }
    setIsLoading(true);
    const obj = {
      name,
      roomId,
    };
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="email"
          placeholder="Name"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>RoomID</Form.Label>
        <Form.Control
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          type="password"
          placeholder="RoomID"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Button disabled={isLoading} onClick={onEnter} variant="success">
          {!isLoading ? 'Войти' : 'Вход'}
        </Button>
      </Form.Group>
    </Form>
  );
}
