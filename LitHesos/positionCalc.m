function [sound_position_estimate] = positionCalc(Fs,speedofsound,micApos,micBpos,micCpos,soundMicA,soundMicB,soundMicC)

soundMicA = bandpass(soundMicA,[7500, 8500], Fs);
soundMicB = bandpass(soundMicB,[7500, 8500], Fs);
soundMicC = bandpass(soundMicC,[7500, 8500], Fs);

% soundMicA = bandpass(soundMicA, [6000, 10000], Fs);
% soundMicB = bandpass(soundMicB, [6000, 10000], Fs);
% soundMicC = bandpass(soundMicC, [6000, 10000], Fs);

% Compute the cross-correlation between the two signals
[correlationAB, lagAB] = xcorr(soundMicA, soundMicB);
[correlationAC, lagAC] = xcorr(soundMicA, soundMicC);


% Find the index of the maximum correlation
[maxCorr1, maxIndex1] = max(abs(correlationAB));
[maxCorr2, maxIndex2] = max(abs(correlationAC));


% Convert the lag index to time (assuming the audio files are sampled at a certain rate)
deltaTAB = lagAB(maxIndex1) / Fs;
deltaTAC = lagAC(maxIndex2) / Fs;

[correlationBC, lagBC] = xcorr(soundMicB, soundMicC);

[maxCorr3, maxIndex3] = max(abs(correlationBC));
    
micPosY1 = micApos;
micPosY2 = micCpos;
deltaY = lagAC(maxIndex2) / Fs;

micPosX1 = micApos;
micPosX2 = micBpos;
deltaX = lagAB(maxIndex1) / Fs;

deltaTAC = lagAC(maxIndex2) / Fs;
deltaTBC = lagBC(maxIndex3) / Fs;

%Define anonymous functions for hyperbolas
hAB = @(x, y) sqrt((x - micPosX1(1)).^2 + (y - micPosX1(2)).^2) - sqrt((x - micPosX2(1)).^2 + (y - micPosX2(2)).^2) - speedofsound * (deltaX);
hAC = @(x, y) sqrt((x - micPosY1(1)).^2 + (y - micPosY1(2)).^2) - sqrt((x - micPosY2(1)).^2 + (y - micPosY2(2)).^2) - speedofsound * (deltaY);

% Estimate sound position by finding the intersection of hyperbolas
f_intersect = @(x) [hAB(x(1), x(2)); hAC(x(1), x(2))];
initial_guess = [0.5, 0.5]; % Initial guess for sound position

options = optimoptions('fsolve','Algorithm','levenberg-marquardt', 'Display','none');
sound_position_estimate = fsolve(f_intersect, initial_guess,options);
end