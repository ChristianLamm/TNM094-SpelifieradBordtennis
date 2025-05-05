const net = require('net');
const WebSocket = require('ws');

// TCP-server
const tcpServer = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        try {
            const msg = data.toString().trim();
            console.log('Received:', msg);
            
            // Parse coordinates (assuming format "x,y")
            const [x, y] = msg.split(',').map(Number);
            
            if (isNaN(x) || isNaN(y)) {
                console.error('Invalid coordinates received');
                return;
            }
            
            // Forward normalized coordinates (0-1 range) to WebSocket clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ 
                        type: 'HIT_COORDS',
                        x: x/1000, 
                        y: y/1000 
                    }));
                }
            });
        } catch (e) {
            console.error('Error processing data:', e);
        }
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

