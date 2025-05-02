//some variables
export const tableWidth = Math.round(window.innerHeight * 1.1);
export const tableHeight = window.innerHeight;
export const bgBlue = 0x00008b;
export const white = 0xffffff;
export const black = 0x000000;

//creating the table
export async function initializeApp() {
  const app = new PIXI.Application();
  await app.init({
    width: tableWidth,
    height: tableHeight,
    backgroundColor: bgBlue,
  });
  console.log("table height: " + tableHeight + "\n" + "table width: " + tableWidth)

  document.body.style.margin = "0";

  //appending the table to the webpage
  document.body.appendChild(app.view);

  //making sure the table is in the middle of the page
  app.view.style.position = "absolute";
  app.view.style.top = "50%";
  app.view.style.left = "50%";
  app.view.style.transform = "translate(-50%, -50%)";

  //drawing lines
  const graphics = new PIXI.Graphics();
  app.stage.addChild(graphics);
  graphics.moveTo(tableWidth / 2, 0);
  graphics.lineTo(tableWidth / 2, tableHeight);
  graphics.stroke({ width: 10, color: white });

  //adding the text for the score
  const scoreText = new PIXI.Text({
    text: "0",
    style: {
      fontFamily: "Arial",
      fontSize: 36,
      fontWeight: "bold",
      align: "center",
      
    }
  });

  scoreText.style.fill = white;
  app.stage.addChild(scoreText);

  //placing the scoretext on the table
  scoreText.x = tableWidth - 50;
  scoreText.y = 50;

  //function to update the score
  function updateScoreText(message) {
    scoreText.text = message;
  }

  return { app, scoreText, updateScoreText };
}
