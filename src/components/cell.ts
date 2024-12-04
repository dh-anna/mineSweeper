import { Sprite, Texture } from "pixi.js";
import { AssetManager } from "../assetManager";

export type CellType = "default" | "mine" | "empty0" | "empty1";

export class Cell {
    private sprite: Sprite;
    private type: string;

    constructor(type: string, texture: Texture, positionX: number, positionY: number) {
        this.type = type;
        this.sprite = new Sprite(texture);
        this.sprite.width = 80;
        this.sprite.height = 80;
        this.sprite.x = positionX;
        this.sprite.y = positionY;
    }

    static createSpecificCell(type: CellType, positionX: number, positionY: number) {
        const texture = AssetManager.getInstance().getAsset(type);
        if (!texture) throw new Error(`Texture for ${type} not found`);
        return new Cell(type, texture, positionX, positionY);
    }

    getSprite() {
        return this.sprite;
    }
}
