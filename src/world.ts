import { Container } from "pixi.js";
import { Entity } from "./entity";

export class World {
    stage: Container;
    entities: {
        [key: string]: Entity;
    };

    constructor(stage: Container) {
        this.stage = stage;
        this.entities = {};
    }

    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.stage.addChild(entity);
    }

    checkTile(x: number, y: number) {}
}
