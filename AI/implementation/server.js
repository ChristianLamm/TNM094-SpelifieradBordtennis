const net = require('net');

const PORT = 3000;

const server = net.createServer((socket) => {
    console.log('Python client connected');

    socket.on('data', (data) => {
        console.log('Received from Python:', data.toString());
        // You can process the data here
    });

    socket.on('end', () => {
        console.log('Python client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});