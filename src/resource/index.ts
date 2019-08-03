import { MobSchema, EntitySchema, SpritesheetSchema } from "./schema";
import { v4 } from "uuid";
import { TileSetSchema } from "../world/tile";

export const uniqueID = v4;

interface Resources {
    readonly sprites: Array<SpritesheetSchema>;
    readonly entities: Array<EntitySchema>;
    readonly tilesets: Array<TileSetSchema>;
}

export const defaultResources: Resources = {
    sprites: [
        {
            id: uniqueID(),
            name: "hero_sprite",
            sheetPath: "res/sprite/adventurer.png",
            framePath: "res/sprite/adventurer.json",
        },
        // TODO stairwell
    ],
    entities: [
        {
            id: uniqueID(),
            name: "hero",
            displayName: "Hero",
            spriteSheet: "sprites.hero_sprite",
        },
        {
            id: uniqueID(),
            name: "stairwell",
            displayName: "Stairwell",
            spriteSheet: "sprites.stairs",
        },
    ],
    tilesets: [
        {
            id: uniqueID(),
            name: "stone_tiles",
            // TODO fix
            floor: "stonefloor",
            wall: "stonewall",
        },
    ],
};
