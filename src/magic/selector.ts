import { Spritesheet, Point } from "pixi.js";
import { Entity } from "../entity";
import { Targets } from "./enums";
import { Spell } from "./data";

export class Selector extends Entity {
	targeting: Targets;
	spell: Spell;

	constructor(texture: Spritesheet) {
		super(texture);
		this.height = 90;
		this.width = 90;
		this.alpha = 0;
	}

	setSpell(spell: Spell) {
		this.spell = spell;
		this.targeting = spell.target;
	}
}
