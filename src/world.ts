import { Container } from "pixi.js";
import { Entity } from "./entity";
import { Overlay } from "./magic/overlay";
import { Scroll } from "./magic/scroll";

export class World extends Container {
    entities: {
        [key: string]: Entity;
    };
    overlay: Overlay;

    constructor() {
        super();
        this.entities = {};
        this.interactive = true;
    }

    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.addChild(entity);
    }

    pickupScroll(entity: Scroll) {
        this.entities[entity.id] = null;
        this.removeChild(entity);
        this.overlay.pickupScroll(entity);
    }

    checkTile(x: number, y: number) {}
}
