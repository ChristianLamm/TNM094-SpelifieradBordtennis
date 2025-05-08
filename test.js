const net = require('net');
const WebSocket = require('ws');

// WebSocket-server
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('WebSocket server listening on port 8080');
});

// TCP-server
const tcpServer = net.createServer((socket) => {
    console.log('Client attempting to connect');

    let handshakeComplete = false;

    socket.on('data', (data) => {
        const msg = data.toString().trim();
        console.log('Received:', msg);

        if (!handshakeComplete) {
            if (msg === 'HANDSHAKE') {
                handshakeComplete = true;
                socket.write('HANDSHAKE_OK\n');
                console.log('Handshake completed with client');
            } else {
                console.log('Invalid handshake message, closing connection');
                socket.end('HANDSHAKE_FAILED\n');
            }
            return;
        }

        // After handshake, forward data to WebSocket clients
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
