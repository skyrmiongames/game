import { Sprite } from "pixi.js";

interface Pane {
    toSprite(): Sprite;
}

interface Button extends Pane {
    onClick(): void;
}
