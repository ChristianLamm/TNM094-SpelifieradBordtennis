import pyaudio
import numpy as np
import librosa
import joblib
import time
from collections import deque
import socket
import json

# Connect to WebSocket server
HOST = 'localhost'  # Node server address
PORT = 3000         # Node server port

# Load trained model
model = joblib.load("AI/random_forest_model.pkl")

# Audio Parameters
CHUNK = 5120
RATE = 44100
CHANNELS = 1
FORMAT = pyaudio.paInt16
BUFFER_SECONDS = 0.2
N_FRAMES = int((RATE * BUFFER_SECONDS) / CHUNK)

#  Detection Parameters 
CONFIDENCE_THRESHOLD = 0.8  # Only trigger if probability > this
COOLDOWN_SECONDS = 1.0       # Prevent multiple detections for same sound

#  Setup 
buffer = deque(maxlen=N_FRAMES)
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

print("🎧 Listening for ping pong sounds... Press Ctrl+C to stop.")

# MFCC Feature Extraction 
def extract_mfcc_mean(audio, rate):
    # Normalize to range [-1, 1]
    if np.max(np.abs(audio)) > 0:
        audio = audio / np.max(np.abs(audio))

    # Extract MFCCs (match training settings)
    mfccs = librosa.feature.mfcc(
        y=audio,
        sr=rate,
        n_mfcc=13,
        n_fft=1024,
        hop_length=512
    )
    return np.mean(mfccs.T, axis=0).reshape(1, -1)

# Live loop 
last_detection_time = 0
counter = 1

try:
    while True:
        data = stream.read(CHUNK, exception_on_overflow=False)
        audio = np.frombuffer(data, dtype=np.int16).astype(np.float32)
        buffer.append(audio)

        if len(buffer) == N_FRAMES:
            full_audio = np.concatenate(list(buffer))
            features = extract_mfcc_mean(full_audio, RATE)
            proba = model.predict_proba(features)[0][1]

            # Confidence and cooldown check
            current_time = time.time()
            if proba > CONFIDENCE_THRESHOLD and (current_time - last_detection_time > COOLDOWN_SECONDS):
                print(f"🏓 Detected ping pong sound! (Confidence: {proba:.2f})")
                print(counter)
                counter += 1
                last_detection_time = current_time

                message = "bouncetrue"
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.connect((HOST, PORT))
                    s.sendall(message.encode('utf-8'))
                    print("Message sent to Node server.")

except KeyboardInterrupt:
    print("\n🛑 Stopped listening.")

#  Clean up 
stream.stop_stream()
stream.close()
p.terminate()
