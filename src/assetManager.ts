import { CellType } from "./components/cell";
import { Assets, Texture } from "pixi.js";

type AssetTypes = CellType;

export class AssetManager {
    private static instance: AssetManager;
    private assets: Partial<Record<AssetTypes, Texture>> = {};

    private constructor() {}

    public static getInstance(): AssetManager {
        if (!AssetManager.instance) {
            AssetManager.instance = new AssetManager();
        }

        return AssetManager.instance;
    }

    public loadAssets() {
        this.assets = {
            empty0: Assets.get("empty0"),
            empty1: Assets.get("empty1"),
            empty2: Assets.get("empty2"),
            empty3: Assets.get("empty3"),
            empty4: Assets.get("empty4"),
            empty5: Assets.get("empty5"),
            empty6: Assets.get("empty6"),
            mine: Assets.get("mine"),
            default: Assets.get("default"),
        };
    }

    public getAsset(key: AssetTypes): Texture | undefined {
        return this.assets[key];
    }
}
