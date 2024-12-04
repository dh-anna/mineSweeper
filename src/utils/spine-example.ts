import { Assets } from "pixi.js";
import { Spine } from "pixi-spine";

export async function getSpine(): Promise<Spine> {
    const resourceTexture = await Assets.load("empty0");

    return resourceTexture;
}
