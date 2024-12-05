import { ColorMatrixFilter, Sprite, Texture } from "pixi.js";
import { AssetManager } from "../assetManager";

export type CellType = "default" | "mine" | "empty0" | "empty1" | "empty2" | "empty3" | "empty4" | "empty5" | "empty6";

export class Cell {
    private sprite: Sprite;
    private type: CellType;

    private hoverFilter = new ColorMatrixFilter();

    constructor(type: CellType, texture: Texture, positionX: number, positionY: number) {
        this.type = type;
        this.sprite = new Sprite(texture);
        this.sprite.width = 80;
        this.sprite.height = 80;
        this.sprite.x = positionX;
        this.sprite.y = positionY;
        this.sprite.eventMode = "static";
        this.sprite.cursor = "pointer";
        this.hoverFilter.brightness(0.85, false);

        this.sprite.on("pointerenter", () => {
            console.log("hovering");
            this.sprite.filters = [this.hoverFilter];
        });
        this.sprite.on("pointerleave", () => {
            console.log("not hovering");
            this.sprite.filters = [];
        });
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
