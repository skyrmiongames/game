import { Targets, Symbols, Stats, States } from "./enums";
import { IResourceDictionary, Point } from "pixi.js";
import { ScrollData, scrolls } from "./data";
import { Entity } from "../entity";

export class ScrollEntity extends Entity {
	state: States;
	place: number;
	duration: number;
	arrived: boolean;

	//Spell identifier
	scroll: string;
	target: Targets;

	constructor(scroll: ScrollData, resources: IResourceDictionary, x: number, y: number) {
		super(resources["res/sprite/scroll.png"].spritesheet, {
			runspeed: 3,
			x: x,
			y: y,
		});

		this.state = States.world;
		this.place = 0;
		this.duration = 60;
		this.arrived = true;

		this.scroll = scroll.name;
		this.target = scroll.target;
	}

	getData(): ScrollData {
		return scrolls[this.scroll];
	}

	getTarget(): Point {
		switch (this.state) {
			case States.deck:
				return new Point(10, 100);
			case States.hand:
				return new Point(20 + 5 * this.place, 300);
			case States.mouse:
				return new Point(0, 0);
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
			if (this.state == States.mouse || Math.abs(this.x - target.x) > 5 || Math.abs(this.y - target.y) > 5) {
				this.move(Math.tan((target.y - this.y) / (target.x - this.x)));
			} else {
				this.arrived = true;
			}
		}
	}
}

export class Effect extends ScrollEntity {
	//Spell values
	symbol: Symbols;
	stat: Stats;
	power: number;

	constructor(scroll: ScrollEntity, resources: IResourceDictionary, player: boolean, x: number, y: number) {
		super(scroll.getData(), resources, x, y);
		this.state = player ? States.self : States.enemy;
		this.duration = 60;

		this.symbol = scroll.getData().symbol;
		this.stat = scroll.getData().stat;
		this.power = scroll.getData().power;
	}
}
