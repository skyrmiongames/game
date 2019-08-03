import { Sprite, Texture, IResourceDictionary } from "pixi.js";
import { ScrollData, scrolls } from "./data";
import { Targets, Symbols, Stats, States } from "./enums";

export class ScrollEntity extends Sprite {
	id: string;
	state: States;
	place: number;
	duration: number;
	arrived: boolean;

	//Spell identifier
	scroll: string;
	target: Targets;

	constructor(scroll: ScrollData, resources: IResourceDictionary) {
		super(resources["res/sprite/sprite.png"].texture);
		this.id = v4();
		this.state = States.world;
		this.place = 0;
		this.duration = 60;
		this.arrived = true;

		this.scroll = scroll.name;
		this.target = scroll.target;
	}

	function getData() {
		return scrolls[scroll];
	}
}

export class Effect extends ScrollEntity {
	//Spell values
	symbol: Symbols;
	stat: Stats;
	power: number;

	constructor(scroll: ScrollEntity, resources: IResourceDictionary, player: boolean) {
		super(scroll.getData(), resources);
		this.state = player ? States.self : States.enemy;
		this.duration = 1;

		this.symbol = scroll.getData().symbol;
		this.stat = scroll.getData().stat;
		this.power = scroll.getData().power;
		this.duration = 60;
	}
}
