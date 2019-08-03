import { Sprite } from "pixi.js";
import { v4 } from "uuid";
import { World } from "./world";

export class Entity {
    id: string;

    sprite: Sprite;
    world: World;

    health: number;
    attack: number;

    constructor(sprite: Sprite, health: number = 10, attack: number = 5) {
        this.id = v4();
        this.sprite = sprite;
        this.health = health;
        this.attack = attack;
        this.sprite.x = 0;
        this.sprite.y = 0;
    }

    move(angle: number /* radians */, distance: number) {
        this.sprite.x += Math.cos(angle) * distance;
        this.sprite.y += -Math.sin(angle) * distance;
    }
}
