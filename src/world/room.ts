import { Tile, TileSet, stoneTileSet } from "./tile";
import { Entity } from "../entity";
import Matrix, { ArrayMatrix, emptyMatrix } from "../matrix";
import _ from "lodash";

export interface Room {
    readonly entities: Matrix<Entity>;
    readonly tiles: Matrix<Tile>;
}

export interface RoomGenerator {
    generate(): Room;
}

export class BasicRoomGenerator implements RoomGenerator {
    private roomTiles: TileSet;
    private width: number;
    private height: number;

    constructor(roomTileSet: TileSet, width: number, height: number) {
        this.roomTiles = roomTileSet;
        this.width = width;
        this.height = height;
    }

    generate(): Room {
        return {
            entities: emptyMatrix(),
            tiles: BasicRoomGenerator.generateRectangularRoomTiles(
                this.roomTiles,
                this.width,
                this.height
            )
        };
    }

    static generateRectangularRoomTiles(
        tiles: TileSet,
        width: number,
        height: number
    ): Matrix<Tile> {
        return new ArrayMatrix(
            _.range(0, height).map(y =>
                _.range(0, width).map(x =>
                    x > 0 && x < width && y > 0 && y < height
                        ? tiles.floor
                        : tiles.wall
                )
            )
        );
    }
}

export default Room;
