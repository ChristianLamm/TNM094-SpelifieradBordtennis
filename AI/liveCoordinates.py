# Import necessary libraries
import numpy as np
import scipy as scipy
import scipy.signal as signal
import sounddevice as sd
import socket
import asyncio
import time

#HOST = 'localhost'  # Node server address
#PORT = 3000         # Node server port

# with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#     s.connect((HOST, PORT))
#     s.sendall("python ready")
#     print("Message sent to Node server.")

# Function to calculate the position of the sound source
def positionCalc(Fs, speedofsound, micApos, micBpos, micCpos, soundMicA, soundMicB, soundMicC):
    # Bandpass filter the signals
    soundMicA = signal.filtfilt(*signal.butter(4, [7500/(Fs/2), 8500/(Fs/2)], btype='band'), soundMicA)
    soundMicB = signal.filtfilt(*signal.butter(4, [7500/(Fs/2), 8500/(Fs/2)], btype='band'), soundMicB)
    soundMicC = signal.filtfilt(*signal.butter(4, [7500/(Fs/2), 8500/(Fs/2)], btype='band'), soundMicC)

    # Compute the cross-correlation between the two signals
    correlationAB = signal.correlate(soundMicA, soundMicB, mode='full')
    correlationAC = signal.correlate(soundMicA, soundMicC, mode='full')
    correlationBC = signal.correlate(soundMicB, soundMicC, mode='full')

    # Find the index of the maximum correlation
    maxIndex1 = np.argmax(np.abs(correlationAB))
    maxIndex2 = np.argmax(np.abs(correlationAC))
    maxIndex3 = np.argmax(np.abs(correlationBC))

    # Convert the lag index to time
    deltaTAB = (maxIndex1 - len(soundMicA) + 1) / Fs
    deltaTAC = (maxIndex2 - len(soundMicA) + 1) / Fs
    deltaTBC = (maxIndex3 - len(soundMicB) + 1) / Fs

    # Define anonymous functions for hyperbolas
    hAB = lambda x, y: np.sqrt((x - micApos[0])**2 + (y - micApos[1])**2) - np.sqrt((x - micBpos[0])**2 + (y - micBpos[1])**2) - speedofsound * deltaTAB
    hAC = lambda x, y: np.sqrt((x - micApos[0])**2 + (y - micApos[1])**2) - np.sqrt((x - micCpos[0])**2 + (y - micCpos[1])**2) - speedofsound * deltaTAC

    # Estimate sound position by finding the intersection of hyperbolas
    f_intersect = lambda x: [hAB(x[0], x[1]), hAC(x[0], x[1])]
    initial_guess = [0.5, 0.5]  # Initial guess for sound position

    sound_position_estimate = signal.optimize.fsolve(f_intersect, initial_guess)
    return sound_position_estimate

# Setup parameters
fs = 48000  # Sample frequency
frameLength = fs // 100  # Frame length
speedofsound = 343  # Speed of sound in m/s

# Microphone positions in meters
micApos = [0.0, 0.0]
micBpos = [1.525, 0.0]
micCpos = [0.0, 1.37]

# Threshold for sound detection
threshold = 0.009

# WebSocket server setup

while True:
    print("Listening...")
    time.sleep(1)
    audio = sd.rec(frameLength, samplerate=fs, channels=3, dtype='float64')
    sd.wait()
    audioA = audio[:, 0]
    audioB = audio[:, 1]
    audioC = audio[:, 2]
    # Compute STE for current frame
    currentSTE = np.sum(audioA**2) / len(audioA)
    if currentSTE > threshold:
        pos = positionCalc(fs, speedofsound, micApos, micBpos, micCpos, audioA, audioB, audioC)
        x = int(1000 * pos[0])
        y = int(1000 * pos[1])
        print(x)
        print(y)

# Start WebSocket server
#start_server = websockets.serve(server, "localhost", 5050)

#asyncio.get_event_loop().run_until_complete(start_server)

