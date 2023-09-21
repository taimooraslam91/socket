const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    socket.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    socket.emit('newUserResponse', users);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('disconnect', () => {
    console.log('user disconnected');
    users = users.filter((user) => user.socket !== socket.id);
    socket.emit('newUserResponse', users);
  });
});

app.get('/', (req, res) => {
  res.send('API is running....');
});

const port = 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));
