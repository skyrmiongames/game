import { Sprite, Texture, IResourceDictionary } from "pixi.js";
import { ScrollData } from "./data";
import { Targets, Symbols, Stats } from "./enums";

export class ScrollEntity extends Sprite {
	id: string;
	scroll: string;
	target: Targets;

	constructor(scroll: ScrollData, resources: IResourceDictionary) {
		super(resources["res/sprite/sprite.png"].texture);
		this.scroll = scroll.name;
		this.target = scroll.target;
	}
}
