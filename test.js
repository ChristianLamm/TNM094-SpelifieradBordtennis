
const net = require('net');
const WebSocket = require('ws'); // WebSocket-server

// TCP-server
const tcpServer = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const msg = data.toString().trim();
        console.log('Received:', msg);

        // Skicka vidare till alla WebSocket-klienter
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

tcpServer.listen(12345, () => {
    console.log('TCP server listening on port 12345');
});

// WebSocket-server 
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('WebSocket server listening on port 8080');
});

