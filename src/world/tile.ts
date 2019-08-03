import { Schema, DisplaySchema } from "../resource/schema";
import { ResourceID } from "../resource/loader";
import { uniqueID } from "../resource";

export interface TileSchema extends Schema {}
export interface TileSetSchema extends TileSet, Schema {}

export interface TileSet {
    floor: ResourceID;
    wall: ResourceID;
}

export interface WallTileSchema extends Schema {
    corner: ResourceID;
    /* Intersections */
    fourWay: ResourceID;
    threeWay: ResourceID;
}

export const emptyTile: TileSchema = {
    id: uniqueID(),
    name: "empty_tile",
};

export const stoneTileSet: TileSetSchema = {
    id: uniqueID(),
    name: "stone_tile_set",
    floor: "tiles.stone_floor",
    wall: "tiles.stone_wall",
};
