const express = require('express');
const { createServer } = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('hello', 'world')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
    res.send('API is running....');
});

const port = 4000; 
server.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
