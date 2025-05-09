function [] = playNote()
fs = 44100; % Sampling frequency in Hz
duration = 0.07; % Duration in seconds (10 ms)
frequency = 2000; % Frequency of the sinusoid in Hz

% Generate the time vector
t = 0:1/fs:duration;

% Generate the sinusoid
signal = sin(2 * pi * frequency * t);

% Play the sound
sound(signal, fs);
end

