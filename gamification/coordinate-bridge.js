// This is a standalone file that handles the coordinate conversion
// It imports the dimensions from common.js and forwards coordinates to your game

import { tableWidth, tableHeight } from './common.js';

// Define the physical table dimensions (in millimeters)
// Adjust these to match your actual table tennis table
const TABLE_WIDTH_MM = 2740; // Standard table tennis table width
const TABLE_HEIGHT_MM = 1525; // Standard table tennis table height

console.log(`Game dimensions from common.js: ${tableWidth}x${tableHeight}`);

// Function to parse coordinates from string format "X329Y692"
function parseCoordinates(coordString) {
    // Extract X and Y values using regex
    const xMatch = coordString.match(/X(\d+)/);
    const yMatch = coordString.match(/Y(\d+)/);
    
    if (!xMatch || !yMatch) {
        console.error("Invalid coordinate format:", coordString);
        return null;
    }
    
    // Convert to numbers
    let xMm = parseInt(xMatch[1], 10);
    let yMm = parseInt(yMatch[1], 10);

    xMm += parseInt(10,10);
    yMm += parseInt(10,10);
    
    return [xMm, yMm];
}

// Function to convert millimeter coordinates to game coordinates
function convertToGameCoordinates(xMm, yMm) {
    // Convert mm coordinates to proportional game coordinates
    const xGame = Math.round((xMm / TABLE_WIDTH_MM) * tableWidth);
    const yGame = Math.round((yMm / TABLE_HEIGHT_MM) * tableHeight);
    
    return [xGame, yGame];
}

// Connect to the MATLAB WebSocket server
const inputSocket = new WebSocket('ws://localhost:3001');

// Connect to your game's WebSocket server
const gameSocket = new WebSocket('ws://localhost:12345');

// Handle incoming messages from MATLAB
inputSocket.onmessage = function(event) {
    const coordString = event.data;
    console.log('Received from MATLAB:', coordString);
    console.log('Data type:', typeof coordString);
    
    // Parse the coordinates - handle different possible formats
    let xMm, yMm;
    
    // Try X123Y456 format
    if (typeof coordString === 'string' && coordString.includes('X') && coordString.includes('Y')) {
        const xMatch = coordString.match(/X(\d+)/);
        const yMatch = coordString.match(/Y(\d+)/);
        
        if (xMatch && yMatch) {
            xMm = parseInt(xMatch[1], 10);
            yMm = parseInt(yMatch[1], 10);
        }
    } 
    // Try direct number format (if MATLAB is sending numbers directly)
    else if (!isNaN(parseFloat(coordString))) {
        // If it's a single number, it might be X or Y coordinate alone
        // For testing purposes, we'll use it as X and set Y to a default
        xMm = parseFloat(coordString);
        yMm = TABLE_HEIGHT_MM / 2; // Default to center Y
    }
    
    // Check if we got valid coordinates
    if (isNaN(xMm) || isNaN(yMm)) {
        console.error('Invalid coordinate format:', coordString);
        return;
    }
    
    console.log(`Extracted mm coordinates: (${xMm}, ${yMm})`);
    
    // Convert to game coordinates
    const xGame = Math.round((xMm / TABLE_WIDTH_MM) * tableWidth);
    const yGame = Math.round((yMm / TABLE_HEIGHT_MM) * tableHeight);
    console.log(`Converted to game coordinates: (${xGame}, ${yGame})`);
    
    // Send to game if game socket is connected
    if (gameSocket.readyState === WebSocket.OPEN) {
        // Send as a simple comma-separated string
        const coordinateString = `${xGame},${yGame}`;
        gameSocket.send(coordinateString);
        console.log(`Sent to game: ${coordinateString}`);
    } else {
        console.warn('Game socket not connected. Cannot send coordinates.');
        // Try to reconnect
        if (gameSocket.readyState === WebSocket.CLOSED) {
            console.log('Attempting to reconnect to game WebSocket...');
            gameSocket = new WebSocket('ws://localhost:12345');
        }
    }
};

// Handle connections
inputSocket.onopen = function() {
    console.log('Connected to MATLAB WebSocket server');
};

gameSocket.onopen = function() {
    console.log('Connected to Game WebSocket server');
};

// Handle disconnections
inputSocket.onclose = function() {
    console.log('Disconnected from MATLAB WebSocket server');
    // You might want to implement reconnection logic here
};

gameSocket.onclose = function() {
    console.log('Disconnected from Game WebSocket server');
    // You might want to implement reconnection logic here
};

// Handle errors
inputSocket.onerror = function(error) {
    console.error('MATLAB WebSocket error:', error);
};

gameSocket.onerror = function(error) {
    console.error('Game WebSocket error:', error);
};

// Export the functions for possible use elsewhere
export { parseCoordinates, convertToGameCoordinates };