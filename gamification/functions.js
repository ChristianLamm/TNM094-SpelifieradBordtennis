//importerar variabler som behövs
import { tableHeight, tableWidth } from "./common.js";

//functiont that changes the texture of a sprite
export function changeTexture(targetSprite, newTexture) {
  targetSprite.texture = newTexture;
}

// function that lets a sprite change texture temporarily
export function changeTextureTemporarily(targetSprite, tempTexture) {
  let originalTexture = targetSprite.texture;
  changeTexture(targetSprite, tempTexture);

  setTimeout(() => {
    changeTexture(targetSprite, originalTexture);
  }, 500); // 1000 milliseconds = 1 second
}

//hit detection function
export function hitCheck(mySprite, myXCoord, myYCoord) {
  //sprite x and y coordinate, top left of the sprite
  let spriteXCoord = mySprite.x;
  let spriteYCoord = mySprite.y;

  //height and width of the sprite
  let spriteHeight = mySprite.height;
  let spriteWidth = mySprite.width;

  if (
    myXCoord >= spriteXCoord &&
    myXCoord <= spriteXCoord + spriteWidth &&
    myYCoord >= spriteYCoord &&
    myYCoord <= spriteYCoord + spriteHeight
  ) {
    console.log("hit");
    return true; // Return true for a hit
  } else {
    console.log("miss");
    return false; // Return false for a miss
  }
}

//function to generate two random coordinates
export function generateRandomCoordinates() {
  let newXPos = Math.random() * tableWidth;
  let newYPos = Math.random() * tableHeight;

  //making sure the new position is not outside of the table
  if (newXPos < 0) {
    newXPos = 0;
  }

  if (newXPos > tableWidth) {
    newXPos = tableWidth;
  }

  if (newYPos < 0) {
    newYPos = 0;
  }

  if (newYPos > tableHeight) {
    newYPos = tableHeight;
  }

  return [newXPos, newYPos];
}

//function that makes sure that moves a sprite to a decided position
export function moveSprite(mySprite, newXPos, newYpos) {
  mySprite.x = newXPos - mySprite.width / 2;
  mySprite.y = newYpos - mySprite.height / 2;

  // Ensure the sprite stays within the table boundaries
  if (mySprite.x < 0) {
    mySprite.x = 0;
  }
  if (mySprite.x + mySprite.width > tableWidth) {
    mySprite.x = tableWidth - mySprite.width;
  }
  if (mySprite.y < 0) {
    mySprite.y = 0;
  }
  if (mySprite.y + mySprite.height > tableHeight) {
    mySprite.y = tableHeight - mySprite.height;
  }
}

export function wiggleSprite(mySprite) {
  const originalX = mySprite.x;
  const originalY = mySprite.y;
  let wiggleCount = 0;
  let stepSize = 2;
  let timeOut = 1000; //1000 is one second

  const interval = setInterval(() => {
    mySprite.x += stepSize;
  }, timeOut);

  const interval2 = setInterval(() => {
    mySprite.y += stepSize;
  }, timeOut);

  const interval3 = setInterval(() => {
    mySprite.x += stepSize;
  }, timeOut);



}
