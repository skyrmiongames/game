import Room, { BasicRoomGenerator } from "./room";
import { stoneTileSet } from "./tile";
import _ from "lodash";

export default interface World {
    readonly rooms: Array<Room>;
}

export interface WorldGenerator {
    generate(): World;
}

export class BasicWorldGenerator {
    private numFloors: number;

    constructor(floors: number) {
        this.numFloors = floors;
    }

    generate(): World {
        const roomGen = new BasicRoomGenerator(stoneTileSet, 10, 10);
        return { rooms: _.range(0, this.numFloors).map(() => roomGen.generate()) };
    }
}
