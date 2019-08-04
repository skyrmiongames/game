import { IResourceDictionary, Point } from "pixi.js";
import { Spell } from "./data";
import { Targets } from "./enums";
import { Entity } from "../entity";

export class Selector extends Entity {
	targeting: Targets;
	spell: Spell;

	constructor(resources: IResourceDictionary) {
		super(resources["res/sprite/select.png"].spritesheet);
	}

	setSpell(spell: Spell) {
		this.spell = spell;
		this.targeting = spell.target;
	}
}