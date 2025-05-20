// game.js
export const tableWidth = Math.round(window.innerHeight * 1.1);
export const tableHeight = window.innerHeight;
export const bgBlue = 0x00008b;
export const white = 0xffffff;
export const black = 0x000000;

export async function initializeApp() {
  const app = new PIXI.Application();
  await app.init({
    width: tableWidth,
    height: tableHeight,
    backgroundColor: bgBlue,
  });

  document.body.style.margin = "0";
  document.body.appendChild(app.view);

  // Center the game canvas
  app.view.style.position = "absolute";
  app.view.style.top = "50%";
  app.view.style.left = "50%";
  app.view.style.transform = "translate(-50%, -50%)";

  // Draw center line
  const graphics = new PIXI.Graphics();
  app.stage.addChild(graphics);
  graphics.moveTo(tableWidth / 2, 0);
  graphics.lineTo(tableWidth / 2, tableHeight);
  graphics.stroke({ width: 10, color: white });

  // Create container for health display (replaces score display)
  const healthContainer = new PIXI.Container();
  healthContainer.x = tableWidth - 150;
  healthContainer.y = 20;
  app.stage.addChild(healthContainer);

  // Health label
  const healthLabel = new PIXI.Text({
    text: "Alien Health:",
    style: {
      fontFamily: "Arial",
      fontSize: 20,
      fill: white
    }
  });
  healthContainer.addChild(healthLabel);

  // Health bar (will be updated dynamically)
  const healthBar = new PIXI.Sprite();
  healthBar.y = 120; // Position below the label
  healthBar.x = -50;
  healthBar.width = 140*1.2;
healthBar.height = 160*1.2;
  healthContainer.addChild(healthBar);


  healthBar.angle = -90;

  function updateHealthDisplay(healthLevel) {
    healthBar.texture = PIXI.Texture.from(`./images/lifebar${healthLevel}.png`);
  }

  return { 
    app, 
    healthBar,
    updateHealthDisplay
  };
}