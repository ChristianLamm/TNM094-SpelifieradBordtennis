import socket

HOST = 'localhost'  # Node server address
PORT = 3000         # Node server port

message = "Hello from Python client!"

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(message.encode('utf-8'))
    print("Message sent to Node server.")