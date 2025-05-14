const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// 1. Start HTTP server to serve the HTML file
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

// 2. WebSocket server for browser clients
const wss = new WebSocket.Server({ server });

// 3. WebSocket client to connect to MATLAB
const matlabSocket = new WebSocket('ws://localhost:5050');

matlabSocket.on('open', () => {
  console.log('Connected to MATLAB');
  matlabSocket.send('Hello from Node.js');
});

// 4. Forward data from MATLAB to browser clients
matlabSocket.on('message', (data) => {
  console.log('Received from MATLAB:', data.toString());

  // Broadcast to all browser clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data.toString());
    }
  });
});

//skickar till porten 3001
server.listen(3001, () => {
  console.log('WebSocket relay server running at http://localhost:3001');
});
