import { AnimatedSprite, Container, Spritesheet, Texture } from "pixi.js";
import { Effect, Scroll } from "./magic/scroll"
import { Vector } from "./vector";
import { Stats } from "./magic/enums";
import { v4 } from "uuid";

export type AnimationState = "idle" | "attack" | "cast" | "die" | "fall" | "hurt" | "jump" | "run";

export class Entity extends Container {
    readonly id: string;
    health: number = 10;
    attack: number = 5;
    runspeed: number = 3; // units per frame
    player: boolean = false;

    effects: Effect[];
    offset: number;

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
        opts?: { health?: number; attack?: number; runspeed?: number; x?: number; y?: number, player?: boolean }
    ) {
        super();
        this.id = v4();

        this.offset = -1;
        this.effects = [];

        // merge the opts properties into this object
        if (opts) Object.assign(this, opts);

        // Generate all the sprites
        this.sprites = {};
        Object.entries(texture.animations).forEach(([name, textureset]: [string, Texture[]]) => {
            let sprite = new AnimatedSprite(textureset);
            sprite.visible = false;
            sprite.animationSpeed = 0.1;
            sprite.play();

            this.addChild(sprite);
            this.sprites[name as AnimationState] = sprite;
        });

        this.animationstate = "idle";
    }

    move_vector: Vector = { scalar: 0, direction: 0 };
    tick(delta: number) {
        if (this.move_vector.scalar > 0 && this.animationstate == "idle") {
            this.animationstate = "run";
        } else if (this.move_vector.scalar == 0 && this.animationstate == "run") {
            this.animationstate = "idle";
        }

        this.move(this.move_vector.direction, delta * this.runspeed * this.move_vector.scalar);
    }

    move(angle: number, distance: number = this.runspeed) {
        this.x += Math.cos(angle) * distance;
        this.y += -Math.sin(angle) * distance;
    }

    applyEffect(effect: Effect, reverse: boolean) {
        let value = effect.power * (reverse ? -1 : 1);
        switch (effect.stat) {
            case Stats.health:
                this.health -= value;
                break;
            case Stats.attack:
                this.attack -= value;
                break;
            case Stats.speed:
                this.runspeed -= value;
                break;
        }
    }

    //Add new effect to list
    addEffect(scroll: Scroll, offset: number, texture: Spritesheet) {
        if(this.offset == -1) {
            this.offset = offset;
        }

        let effect = new Effect(scroll, texture, this.player, this.offset);
        effect.place = this.effects.length - 1;
        this.applyEffect(effect, false);
    }

    //Move effect timers if space is clear
    lowerOffset(start: number) {
        if(!this.player && this.offset > start) {
            this.offset -= 1;
            for(var i = 0; i < this.effects.length; i++) {
                this.effects[i].offset = this.offset;
                this.effects[i].arrived = false;
            }
        }
    }

    //Manage effect timers
    tickEffects(): number {
        var ended = 0;

        for(var i = 0; i < this.effects.length; i++) {
            this.effects[i].duration -= 1;

            //Check for timer end
            if(this.effects[i].duration <= 0) {
                this.applyEffect(this.effects.slice(i, 1)[0], true);
                ended++;
                i--;
            } else {
                this.effects[i].place -= ended;
                this.effects[i].arrived = false;
            }
        }

        if(this.effects.length > 0)
            return -1;

        //Return offset if empty
        ended = this.offset;
        this.offset = -1;
        return ended;
    }
}
