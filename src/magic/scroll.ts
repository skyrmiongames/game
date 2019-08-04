import { Targets, Symbols, Stats, States } from "./enums";
import { Spritesheet, Point } from "pixi.js";
import { Spell, spells } from "./data";
import { Entity } from "../entity";
import { mouse } from "../index";

export class Scroll extends Entity {
	state: States;
	place: number;
	duration: number;
	arrived: boolean;

	//Spell identifier
	spell: string;
	target: Targets;

	constructor(scroll: Spell, texture: Spritesheet, x: number, y: number) {
		super(texture, {
			runspeed: 5,
			x: x,
			y: y,
		});

		this.height = 90;
		this.width = 90;

		this.state = States.world;
		this.place = 0;
		this.duration = 60;
		this.arrived = true;

		this.spell = scroll.name;
		this.target = scroll.target;
	}

	getData(): Spell {
		return spells[this.spell];
	}

	getTarget(): Point {
		switch (this.state) {
			case States.deck:
				return new Point(10, 430);
			case States.hand:
				return new Point(100 + 80 * this.place, 400);
			case States.mouse:
				return new Point(mouse.x - 10, mouse.y - 10);
			case States.self:
				return new Point(5 + 5 * this.place, 5);
			case States.enemy:
				return new Point(300 - 5 * this.place, 5);
			default:
				return new Point(0, 0);
		}
	}

	//Override update loop
	tick(delta: number) {
		if (!this.arrived) {
			let target = this.getTarget();
			if (Math.abs(this.x - target.x) > 6 || Math.abs(this.y - target.y) > 6) {
				this.move(Math.atan2(this.y - target.y, target.x - this.x));
			} else if (this.state != States.mouse) {
				this.arrived = true;
			}
		}
	}
}

export class Effect extends Scroll {
	//Spell values
	symbol: Symbols;
	stat: Stats;
	power: number;

	constructor(scroll: Scroll, texture: Spritesheet, player: boolean, x: number, y: number) {
		super(scroll.getData(), texture, x, y);
		this.state = player ? States.self : States.enemy;
		this.duration = 60;

		this.symbol = scroll.getData().symbol;
		this.stat = scroll.getData().stat;
		this.power = scroll.getData().power;
	}
}
