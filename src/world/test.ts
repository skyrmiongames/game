import { BasicWorldGenerator } from "./world";
import { BasicLoader } from "../resource/loader";
import { defaultResources } from "../resource";

const worldGenerator = new BasicWorldGenerator(1, new BasicLoader(defaultResources));

const world = worldGenerator.generate();

console.log(JSON.stringify(world.rooms[0], null, 2));
