import { TileSet } from "./tile";
import Matrix, { ArrayMatrix, emptyMatrix } from "../matrix";
import * as _ from "lodash";
import { ResourceID } from "../resource/loader";

export interface Room {
    readonly entities: Matrix<ResourceID>;
    readonly tiles: Matrix<ResourceID>;
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
            // TODO fix empty entities
            entities: emptyMatrix(),
            tiles: generateRectangularRoomTiles(this.roomTiles, this.width, this.height),
        };
    }
}

export const generateRectangularRoomTiles = (tiles: TileSet, width: number, height: number): Matrix<ResourceID> => {
    return new ArrayMatrix(
        _.range(0, height).map(y =>
            _.range(0, width).map(x => (x > 0 && x < width && y > 0 && y < height ? tiles.floor : tiles.wall))
        )
    );
};

export default Room;
