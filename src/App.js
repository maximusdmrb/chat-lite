import React, { useReducer, useEffect } from 'react';

import socket from './socket';
import axios from 'axios';
import Join from './components/Join';
import reducer from './reducer';
import Chat from './components/Chat';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    userName: null,
    roomId: null,
    users: [],
  });
  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'ROOM:GET_USERS',
      payload: users,
    });
  };

  useEffect(() => {
    socket.on('ROOM:GET_USERS', setUsers);
  }, []);

  return (
    <div className="container pt-4">
      {!state.joined ? <Join onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
