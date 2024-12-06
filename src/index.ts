import "pixi-spine";
import "./style.css";
import { AnimatedSprite, Application, Assets, Texture } from "pixi.js";
import { Table } from "./components/table";
import { AssetManager } from "./assetManager";
import { gameEvents } from "./gameEvent";

const gameWidth = 1280;
const gameHeight = 720;

const gameState = {
    gameLost: false,
};

gameEvents.on("gamelost", () => {
    gameState.gameLost = true;
});

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0x909090,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    const table = new Table(5, 5, 5);

    app.stage.addChild(table.container);
    app.stage.interactive = true;
    table.container.x = 0;
    table.container.y = 0;

    console.log(table.container.parent);

    resizeCanvas();
};

gameEvents.on("gamelost", async () => {
    const explosionTextures = [];
    let i;

    for (i = 0; i < 26; i++) {
        const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

        explosionTextures.push(texture);
    }

    // Create and randomly place the animated explosion sprites on the stage
    for (i = 0; i < 50; i++) {
        //const texture = await Assets.load("https://pixijs.com/assets/spritesheet/mc.json");
        // Create an explosion AnimatedSprite
        const explosion = new AnimatedSprite(explosionTextures);

        explosion.x = Math.random() * app.screen.width;
        explosion.y = Math.random() * app.screen.height;
        explosion.anchor.set(0.5);
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(0.75 + Math.random() * 0.5);
        explosion.gotoAndPlay((Math.random() * 26) | 0);
        app.stage.addChild(explosion);
    }
});

async function loadGameAssets(): Promise<void> {
    const assetNames = ["mine", "default", "empty0", "empty1", "empty2", "empty3", "empty4", "empty5", "empty6"];
    const manifest = {
        bundles: assetNames.map((name) => ({
            name: name,
            assets: [
                {
                    name: name,
                    src: `./assets/${name}.png`,
                },
            ],
        })),
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(manifest.bundles.map((a) => a.name));

    AssetManager.getInstance().loadAssets();
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}
