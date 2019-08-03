import { Container } from "pixi.js";
import { Entity } from "./entity";
import { ScrollEntity } from "./magic/scroll"
import { Overlay } from "./magic/overlay"

export class World extends Container {
    entities: {
        [key: string]: Entity;
    };
    overlay: Overlay;

    constructor() {
        super();
        this.entities = {};
    }

    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.addChild(entity);
    }

    addScroll(entity: ScrollEntity) {
        this.addChild(entity);
    }

    pickupScroll(entity: ScrollEntity) {
         this.removeChild(entity);
         this.overlay.pickupScroll(entity);
    }

    checkTile(x: number, y: number) {}
}
