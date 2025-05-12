// Coordinate conversion for half table with dynamic sizing

import { tableWidth, tableHeight } from './common.js';

// Define the physical table dimensions (in millimeters)
const HALF_TABLE_WIDTH_MM = 1370; // Half of standard table tennis table width (2740/2)
const TABLE_HEIGHT_MM = 1525; // Standard table tennis table height

// Function to log dimensions for debugging
function logDimensions() {
    console.log('Dynamic Game Dimensions:');
    console.log(`Table Width (px): ${tableWidth}`);
    console.log(`Table Height (px): ${tableHeight}`);
    console.log(`Half Table Width (mm): ${HALF_TABLE_WIDTH_MM}`);
    console.log(`Table Height (mm): ${TABLE_HEIGHT_MM}`);
}

// Robust coordinate conversion function for half table
function convertCoordinates(inputCoord) {
    // Log dimensions at the start of each conversion
    logDimensions();

    // Detailed logging of input
    console.log('Raw input coordinate:', inputCoord);
    console.log('Input type:', typeof inputCoord);

    // Ensure input is a string
    if (typeof inputCoord !== 'string') {
        console.error('Input is not a string. Received:', inputCoord);
        return null;
    }

    // Trim any whitespace
    inputCoord = inputCoord.trim();

    // Try to extract X and Y coordinates using a more flexible regex
    const xMatch = inputCoord.match(/X(\d+)/i);
    const yMatch = inputCoord.match(/Y(\d+)/i);
    
    // Validate matches
    if (!xMatch || !yMatch) {
        console.error('Failed to extract coordinates from:', inputCoord);
        console.error('X match:', xMatch);
        console.error('Y match:', yMatch);
        return null;
    }

    // Parse coordinates
    const xMm = parseInt(xMatch[1], 10);
    const yMm = parseInt(yMatch[1], 10);

    // Validate parsed coordinates
    if (isNaN(xMm) || isNaN(yMm)) {
        console.error('Failed to parse numeric coordinates:', xMm, yMm);
        return null;
    }

    // Convert mm coordinates to proportional game coordinates
    // Only use half the width for conversion since we're using half the table
    const xGame = Math.round((xMm / HALF_TABLE_WIDTH_MM) * tableWidth);
    const yGame = Math.round((yMm / TABLE_HEIGHT_MM) * tableHeight);

    // Extensive logging of conversion process
    console.log('Input coordinate:', inputCoord);
    console.log('Raw mm coords: (X:', xMm, ', Y:', yMm, ')');
    console.log('Converted game coords: (X:', xGame, ', Y:', yGame, ')');

    return `${xGame},${yGame}`;
}

// Connect to the MATLAB WebSocket server
const inputSocket = new WebSocket('ws://localhost:3001');

// Connect to your game's WebSocket server
const gameSocket = new WebSocket('ws://localhost:12345');

// Handle incoming messages from MATLAB
inputSocket.onmessage = function(event) {
    console.log('Received WebSocket message:', event.data);
    
    try {
        // Convert coordinates
        const convertedCoords = convertCoordinates(event.data);
        
        // Send to game if game socket is connected
        if (gameSocket.readyState === WebSocket.OPEN && convertedCoords) {
            gameSocket.send(convertedCoords);
            console.log(`Sent to game: ${convertedCoords}`);
        } else {
            console.warn('Game socket not connected or conversion failed.');
            console.warn('Game socket state:', gameSocket.readyState);
        }
    } catch (error) {
        console.error('Unexpected error processing coordinates:', error);
    }
};

// Handle connections
inputSocket.onopen = function() {
    console.log('Connected to MATLAB WebSocket server');
};

gameSocket.onopen = function() {
    console.log('Connected to Game WebSocket server');
};

// Handle disconnections and errors
inputSocket.onclose = () => console.log('Disconnected from MATLAB WebSocket server');
gameSocket.onclose = () => console.log('Disconnected from Game WebSocket server');
inputSocket.onerror = (error) => console.error('MATLAB WebSocket error:', error);
gameSocket.onerror = (error) => console.error('Game WebSocket error:', error);

// Export the conversion function for potential reuse
export { convertCoordinates };