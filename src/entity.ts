import { Sprite } from "pixi.js";
import { v4 } from "uuid";

export class Entity {
	id: string;
	sprite: Sprite;
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

	move(angle: number, distance: number) {}
}
