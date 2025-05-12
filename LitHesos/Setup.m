function Setup

    % Lägger till Websocket pathen
    addpath(genpath("MatlabWebSocket"));

    % Automatiserar websocket setup skiten...
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Define the JAR path to add
    jarPath = fullfile(pwd, 'MatlabWebSocket', 'jar', 'matlab-websocket-1.6.jar');
    classpathFile = fullfile(prefdir, 'javaclasspath.txt');
    
    % If the file exists, read its lines; otherwise start with empty
    if isfile(classpathFile)
        lines = readlines(classpathFile);
    else
        lines = strings(0,1); % Create an empty string array
    end

    % Check if the last line matches (ignore whitespace)
    if isempty(lines) || ~strcmp(strtrim(lines(end-1)), strtrim(jarPath))
       writelines(jarPath, classpathFile, 'WriteMode', 'append');
    end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
end

