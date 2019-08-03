import { Sprite } from "pixi.js";
import { v4 } from "uuid";
import { Effect } from "./magic/scroll"

export class Entity {
    id: string;
    sprite: Sprite;
    health: number;
    attack: number;
    speed: number;

    //Running effects
    effects: [
        Effect
    ]

    constructor(sprite: Sprite, health: number = 10, attack: number = 5, speed: number = 4) {
        this.id = v4();
        this.sprite = sprite;
        this.health = health;
        this.attack = attack;
        this.speed = speed;
    }

    move(angle: number) {
        this.sprite.x += Math.cos(angle) * this.speed;
        this.sprite.y += Math.sin(angle) * this.speed;
    }
}
