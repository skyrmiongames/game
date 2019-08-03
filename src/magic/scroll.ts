import { IResourceDictionary, Sprite } from "pixi.js";
import { ScrollData } from "./data";
import { Targets } from "./enums";

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
