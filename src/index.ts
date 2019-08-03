import "core-js";
import { Application, IResourceDictionary, Loader, Sprite } from "pixi.js";
import { Entity } from "./entity";
import "./main.css";
import { World } from "./world";
import { mainMenu } from "./gui/mainmenu";
import { addGui } from "./gui";

const app = new Application({
    // Create the Pixi base
    resizeTo: window,
    resolution: 1,
    antialias: false
});
document.body.appendChild(app.view); // Inject it

Loader.shared
    .add([
        require("../res/sprite/adventurer-idle-00.png") // must use webpack require
    ])
    .on("start", () => {
        console.log("Loading...");
    })
    .on("progress", (loader, resource) => {
        console.log(`Loaded ${resource.name} (${loader.progress}%)`);
    })
    .on("complete", main)
    .load();

function main(loader: Loader, obj: IResourceDictionary) {
    console.log("All resources loaded.");
    console.log(obj);

    app.stage.interactive = true;

    addGui(mainMenu, app.stage);
    let world = new World(app.stage);

    let adventurer = new Entity(new Sprite(obj[require("../res/sprite/adventurer-idle-00.png")].texture)); //create sprite
    // adventurer.alpha = 0; // make it invisible

    // world.addEntity(adventurer); // add it to the stage
}
