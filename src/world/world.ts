import Room, { BasicRoomGenerator } from "./room";
import { TileSetSchema } from "./tile";
import * as _ from "lodash";
import { ResourceLoader } from "../resource/loader";

export default interface World {
    readonly rooms: Array<Room>;
}

export interface WorldGenerator {
    generate(): World;
}

export class BasicWorldGenerator {
    readonly nFloors: number;
    readonly loader: ResourceLoader;

    constructor(nFloors: number, loader: ResourceLoader) {
        this.nFloors = nFloors;
        this.loader = loader;
    }

    generate(): World {
        const tilesets = this.loader.load<Array<TileSetSchema>>("tilesets");
        const roomGen = new BasicRoomGenerator(tilesets[0], 10, 10);
        return { rooms: _.range(0, this.nFloors).map(() => roomGen.generate()) };
    }
}
