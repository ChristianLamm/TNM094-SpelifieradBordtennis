// common.js
//ratio width and height : 
export const tableWidth = window.innerHeight * 1.1;
export const tableHeight = window.innerHeight;
export const bgBlue = 0x00008b;
export const white = 0xffffff;

export async function initializeApp() {
  const app = new PIXI.Application();
  await app.init({
    //  width: tableWidth,
    //  height: tableHeight,
    width: tableWidth,
    height: tableHeight,
    //resizeTo: window,
    backgroundColor: bgBlue,
  });

  document.body.style.margin = "0";
  //document.body.style.overflow = "hidden";

  //app.view.style.width = window.style.width;
  // app.view.style.height = '600px';

  document.body.appendChild(app.view);
  app.view.style.position = "absolute";
  app.view.style.top = "50%";
  app.view.style.left = "50%";
  app.view.style.transform = "translate(-50%, -50%)";

  const graphics = new PIXI.Graphics();
  app.stage.addChild(graphics);
  graphics.moveTo(tableWidth / 2, 0);
  graphics.lineTo(tableWidth / 2, tableHeight);
  graphics.stroke({ width: 10, color: white });

  const scoreText = new PIXI.Text({
    text: "0",
    style: {},
  });

  scoreText.style.fill = white;
  app.stage.addChild(scoreText);

  scoreText.x = tableWidth - 50;
  scoreText.y = tableHeight - 50;

  function updateScoreText(message) {
    scoreText.text = message;
  }

  return { app, scoreText, updateScoreText };
}
