import { Container } from "pixi.js";
import { Entity } from "./entity";

export class World {
	stage: Container;

	addEntity(entity: Entity) {
		this.stage.addChild(entity.sprite);
	}
}
