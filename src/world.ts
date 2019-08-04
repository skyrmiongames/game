import { Container, IResourceDictionary } from "pixi.js";
import { Selector } from "./magic/selector";
import { Overlay } from "./magic/overlay";
import { Scroll } from "./magic/scroll";
import { Entity } from "./entity";
import { scrollT } from "./index";

export class World extends Container {
    entities: {
        [key: string]: Entity;
    };
    overlay: Overlay;

    constructor(resources: IResourceDictionary) {
        super();
        this.entities = {};
        this.interactive = true;

        let selector = new Selector(resources[scrollT.framePath].spritesheet);
        this.addEntity(selector);

        this.overlay = new Overlay(selector);
        this.addChild(this.overlay);
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

    setOffsets(start: number) {
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i] as Entity;
            if (child.id) {
                   child.lowerOffset(start);
            }
        }
    }

    tick(delta: number) {
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i] as Entity;
            if (child.id) {
                child.tick(delta);

                let k = child.tickEffects();
                if(k != -1)
                    this.setOffsets(k);
            }
        }
        this.overlay.tick(delta);
    }

    checkTile(x: number, y: number) {}
}
