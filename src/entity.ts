import { Sprite, Texture } from "pixi.js";
import { v4 } from "uuid";

export class Entity extends Sprite {
    id: string;
    health: number = 10;
    attack: number = 5;
    speed: number = 5; // units per frame

    constructor(texture: Texture, opts?: { health?: number; attack?: number; speed?: number; x?: number; y?: number }) {
        super(texture);
        this.id = v4();

        if (opts) Object.assign(this, opts);
    }

    move(angle: number, distance: number = this.speed) {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
    }
}
