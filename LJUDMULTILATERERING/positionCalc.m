function [sound_position_estimate] = positionCalc(simulation, Fs,speedofsound,micApos,micBpos,micCpos, micDpos,soundMicA,soundMicB,soundMicC, soundMicD)

soundMicA = bandpass(soundMicA,[7500, 8500], Fs);
soundMicB = bandpass(soundMicB,[7500, 8500], Fs);
soundMicC = bandpass(soundMicC,[7500, 8500], Fs);

% Compute the cross-correlation between the two signals
[correlationAB, lagAB] = xcorr(soundMicA, soundMicB);
[correlationAC, lagAC] = xcorr(soundMicA, soundMicC);


% Find the index of the maximum correlation
[maxCorr1, maxIndex1] = max(abs(correlationAB));
[maxCorr2, maxIndex2] = max(abs(correlationAC));


% Convert the lag index to time (assuming the audio files are sampled at a certain rate)
deltaTAB = lagAB(maxIndex1) / Fs;
deltaTAC = lagAC(maxIndex2) / Fs;

if ~simulation

    [correlationBD, lagBD] = xcorr(soundMicB, soundMicD);
    [correlationCD, lagCD] = xcorr(soundMicC, soundMicD);
    [correlationBC, lagBC] = xcorr(soundMicB, soundMicC);
    
    [maxCorr3, maxIndex3] = max(abs(correlationBC));
    [maxCorr4, maxIndex4] = max(abs(correlationBD));
    [maxCorr5, maxIndex5] = max(abs(correlationCD));
        
    if(deltaTAB < 0)
        %micPosX1 = micApos; micPosX2 = micBpos;
        micPosY1 = micApos;
        micPosY2 = micCpos;
        %deltaX = lagAB(maxIndex1) / Fs;
        deltaY = lagAC(maxIndex2) / Fs;
    else
        %micPosX1 = micApos; micPosX2 = micBpos;
        micPosY1 = micBpos;
        micPosY2 = micDpos;
        %deltaX = lagAB(maxIndex1) / Fs;
        deltaY = lagBD(maxIndex4) / Fs;
    end
    if(deltaTAC < 0)
        micPosX1 = micApos;
        micPosX2 = micBpos;
        %micPosY1 = micApos; micPosY2 = micCpos;
        deltaX = lagAB(maxIndex1) / Fs;
        %deltaY = lagAC(maxIndex2) / Fs;
    else
        micPosX1 = micCpos;
        micPosX2 = micDpos;
        %micPosY1 = micBpos; micPosY2 = micCpos;
        deltaX = lagCD(maxIndex5) / Fs;
        %deltaY = lagBC(maxIndex3) / Fs;
    end
    deltaTAC = lagAC(maxIndex2) / Fs;
    deltaTBC = lagBC(maxIndex3) / Fs;
    
    %Define anonymous functions for hyperbolas
    hAB = @(x, y) sqrt((x - micPosX1(1)).^2 + (y - micPosX1(2)).^2) - sqrt((x - micPosX2(1)).^2 + (y - micPosX2(2)).^2) - speedofsound * (deltaX);
    hAC = @(x, y) sqrt((x - micPosY1(1)).^2 + (y - micPosY1(2)).^2) - sqrt((x - micPosY2(1)).^2 + (y - micPosY2(2)).^2) - speedofsound * (deltaY);
else

    %Not needed, might be used for higer precision.
    hAB = @(x, y) sqrt((x - micApos(1)).^2 + (y - micApos(2)).^2) - sqrt((x - micBpos(1)).^2 + (y - micBpos(2)).^2) - speedofsound * (deltaTAB);
    hAC = @(x, y) sqrt((x - micApos(1)).^2 + (y - micApos(2)).^2) - sqrt((x - micCpos(1)).^2 + (y - micCpos(2)).^2) - speedofsound * (deltaTAC);
end

% Estimate sound position by finding the intersection of hyperbolas
f_intersect = @(x) [hAB(x(1), x(2)); hAC(x(1), x(2))];
initial_guess = [0.5, 0.5]; % Initial guess for sound position

%options = optimoptions('fsolve','Algorithm','levenberg-marquardt');
sound_position_estimate = fsolve(f_intersect, initial_guess);
end