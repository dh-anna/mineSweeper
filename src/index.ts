import "pixi-spine";
import "./style.css";
import { Application, Assets } from "pixi.js";
import { Table } from "./components/table";
import { AssetManager } from "./assetManager";

const gameWidth = 1280;
const gameHeight = 720;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0x909090,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);
    //const texture = await Assets.load("empty0");
    //const spineExample = new Cell("1", texture, 100, 100).getSpine();

    //spineExample.anchor.set(0.5);

    // Move the sprite to the center of the screen.
    //spineExample.x = app.screen.width / 2;
    //spineExample.y = app.screen.height / 2;

    const table = new Table(5, 5, 5);

    app.stage.addChild(table.container);
    app.stage.interactive = true;
    table.container.x = app.screen.width / 2;
    table.container.y = app.screen.height / 2;
    table.container.pivot.x = table.container.width / 2;
    table.container.pivot.y = table.container.height / 2;

    resizeCanvas();
};

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
