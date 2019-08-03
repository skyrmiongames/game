import { ResourceID } from "./loader";

export interface Schema {
    id: ResourceID;
    name: string;
}

export interface SpritesheetSchema extends Schema {
    framePath: string;
    sheetPath: string;
}

export interface DisplaySchema extends Schema {
    spriteSheet: ResourceID;
}

export interface EntitySchema extends DisplaySchema {
    displayName: string;
}

export interface MobSchema extends EntitySchema {
    health: number;
    attack: number;
    difficulty: number;
}

export interface PlayerSchema extends EntitySchema {
    name: "player";
}

export interface CardSchema extends EntitySchema {
    // TODO add Stuart's schema data
    effects: Array<ResourceID>;
}
