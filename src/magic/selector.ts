import { IResourceDictionary, Point } from "pixi.js";
import { Entity } from "../entity";

export class Selector extends Entity {
	constructor(resources: IResourceDictionary) {
		super(resources["res/sprite/select.png"].spritesheet);
	}
}