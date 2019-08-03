/* Author: Kaden Thomas
 *
 * Tile information
 */

export type Tile = string;

export interface TileSet {
    readonly floor: Tile;
    readonly wall: Tile;
}

export const emptyTile: Tile = "tile.empty";

export const stoneTileSet: TileSet = {
    floor: "tile.stone.floor",
    wall: "tile.stone.wall"
};
