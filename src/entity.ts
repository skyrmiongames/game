import { Sprite } from "pixi.js";
import { v4 } from "uuid";

export class Entity {
    id: string;
    sprite: Sprite;
    health: number;
    attack: number;

    constructor(sprite: Sprite, health: number = 10, attack: number = 5) {
        this.id = v4();
        this.sprite = sprite;
        this.health = health;
        this.attack = attack;
    }

    move(angle: number, distance: number) {
        this.sprite.x += Math.cos(angle) * distance;
        this.sprite.y += Math.sin(angle) * distance;
    }
}
