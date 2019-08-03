import { AnimatedSprite, Container, Spritesheet, Texture } from "pixi.js";
import { v4 } from "uuid";

export type AnimationState = "idle" | "attack" | "cast" | "die" | "fall" | "hurt" | "jump" | "run";

export class Entity extends Container {
    readonly id: string;
    health: number = 10;
    attack: number = 5;
    speed: number = 3; // units per frame

    // intelligently control the animation state
    private _animationstate: AnimationState = "idle";
    set animationstate(to: AnimationState) {
        this.sprites[this.animationstate].visible = false;
        this._animationstate = to;
        this.sprites[this.animationstate].visible = true;
    }
    get animationstate() {
        return this._animationstate;
    }

    sprites: {
        [key in AnimationState]?: AnimatedSprite;
    };

    constructor(
        texture: Spritesheet,
        opts?: { health?: number; attack?: number; speed?: number; x?: number; y?: number }
    ) {
        super();
        this.id = v4();

        if (opts) Object.assign(this, opts);

        this.sprites = {};
        Object.entries(texture.animations).forEach(([name, textureset]: [string, Texture[]]) => {
            let sprite = new AnimatedSprite(textureset);
            sprite.visible = false;
            sprite.animationSpeed = 0.2;
            sprite.play();

            this.addChild(sprite);
            this.sprites[name as AnimationState] = sprite;
        });

        this.animationstate = "run";
    }

    move(angle: number, distance: number = this.speed) {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
    }
}
