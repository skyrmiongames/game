import { Container } from "pixi.js";
import { Entity } from "./entity";

export class World {
    stage: Container;
    entities: {
        [key: string]: Entity;
    };

    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.stage.addChild(entity.sprite);
        entity.world = this;
    }

    checkTile(x: number, y: number) {}
}
