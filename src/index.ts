import "core-js";
import { Application, IResourceDictionary, Loader, LoaderResource } from "pixi.js";
import { Entity } from "./entity";
import { addGui } from "./gui";
import { mainMenu } from "./gui/mainmenu";
import "./main.css";
import { World } from "./world";

const app = new Application({
    // Create the Pixi base
    resizeTo: window,
    resolution: 1,
    antialias: false,
});
document.body.appendChild(app.view); // Inject it

Loader.shared
    .add([
        "res/sprite/adventurer-idle-00.png", // must use webpack require
    ])
    .on("start", () => {
        console.log("Loading...");
    })
    .on("progress", (loader: Loader, resource: LoaderResource) => {
        console.log(`Loaded ${resource.name} (${loader.progress}%)`);
    })
    .on("complete", main)
    .load();

function main(loader: Loader, resources: IResourceDictionary) {
    console.log("All resources loaded.");

    app.stage.interactive = true;

    addGui(mainMenu, app.stage);

    let world = new World();
    let adventurer = new Entity(resources["res/sprite/adventurer-idle-00.png"].texture); //create sprite
    world.addEntity(adventurer); // add it to the stage

    app.stage = world; // make the world active
}
