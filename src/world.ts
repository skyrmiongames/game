import { Container } from "pixi.js";
import { Entity } from "./entity";

export class World extends Container {
    entities: {
        [key: string]: Entity;
    };

    constructor() {
        super();
        this.entities = {};
    }

    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.addChild(entity);
    }

    checkTile(x: number, y: number) {}
}
