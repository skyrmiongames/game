import { Sprite } from "pixi.js";
import { v4 } from "uuid";
import { World } from "./world";

export class Entity {
    id: string;
    sprite: Sprite;
    world: World;
    health: number;
    attack: number;
    location: {
        x: number;
        y: number;
    };

    constructor(sprite: Sprite, health: number = 10, attack: number = 5) {
        this.id = v4();
        this.sprite = sprite;
        this.health = health;
        this.attack = attack;
        this.location.x = 0;
        this.location.y = 0;
    }

    move(angle: number, distance: number) {
        this.location.x += Math.cos(angle) * distance;
        this.location.y += Math.sin(angle) * distance;
    }
}
