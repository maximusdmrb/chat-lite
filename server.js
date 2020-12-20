const express = require('express');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000' },
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : { users: [], messages: [] };
  res.json(obj);
});

app.post('/rooms', (req, res) => {
  const { name, roomId } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.json([...rooms.keys()]);
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, name }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, name);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).emit('ROOM:GET_USERS', users);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).emit('ROOM:GET_USERS', users);
      }
    });
  });

  console.log('user connected', socket.id);
});

server.listen(9999, (err) => {
  if (err) throw Error(err);
  console.log('Started');
});
