import "core-js";
import { html, render } from "lit-html";
import { Application, IResourceDictionary, Loader, LoaderResource } from "pixi.js";
import { Entity } from "./entity";
import { addGui } from "./gui";
import { mainMenu } from "./gui/mainmenu";
import "./main.css";
import { World } from "./world";

const loadingTemplate = (percentage: number) => html`
    <h1>Loading...</h1>
    <progress max="100" , value="${percentage}"></progress>
`;

const app = new Application({
    // Create the Pixi base
    resizeTo: window,
    resolution: 1,
    antialias: false,
});

Loader.shared
    .add(["res/sprite/adventurer.json"])
    .add(["res/text/spells.csv"])
    .on("start", () => {
        console.log("Loading...");
    })
    .on("progress", (loader: Loader, resource: LoaderResource) => {
        console.log(`Loaded ${resource.name} (${loader.progress}%)`);
        render(loadingTemplate(loader.progress), document.body);
    })
    .on("complete", main)
    .load();

function main(loader: Loader, resources: IResourceDictionary) {
    console.log("All resources loaded.");
    render(app.view, document.body);

    app.stage.interactive = true;

    addGui(mainMenu, app.stage);

    let world = new World();
    let adventurer = new Entity(resources["res/sprite/adventurer.json"].spritesheet); //create sprite
    world.addEntity(adventurer); // add it to the stage

    app.stage = world; // make the world active

    app.ticker.add((delta: number) => {
        // Animation loop

        adventurer.move(0, adventurer.speed * delta);
    });
}
