import { Application, IResourceDictionary, Loader, LoaderResource, Point } from "pixi.js";
import { SpritesheetSchema } from "./resource/schema";
import { BasicLoader } from "./resource/loader";
import { add_vectors, Vector } from "./vector";
import { defaultResources } from "./resource";
import { mainMenu } from "./gui/mainmenu";
import { html, render } from "lit-html";
import { Scroll } from "./magic/scroll";
import { spells } from "./magic/data";
import { Entity } from "./entity";
import { World } from "./world";
import { addGui } from "./gui";
import "./main.css";
import "core-js";



const resourceLoader = new BasicLoader(defaultResources);

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

const heroT = resourceLoader.load<SpritesheetSchema>("sprites.hero");
export const scrollT = resourceLoader.load<SpritesheetSchema>("sprites.scroll");

export var mouse: Point;
Loader.shared
    .add([heroT.framePath, scrollT.framePath])
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

    let world = new World(resources);

    // Hero setup
    let adventurer = new Entity(resources[heroT.framePath].spritesheet);
    let keyStates = { w: false, a: false, s: false, d: false } as { [key: string]: boolean };
    function adjustadventurervelocity(key: string, pressed: boolean) {
        if (Object.keys(keyStates).includes(key.toLowerCase())) {
            keyStates[key.toLowerCase()] = pressed;
        }

        let vectors: Vector[] = [];

        if (keyStates.w) vectors.push({ scalar: 1, direction: Math.PI / 2 });
        if (keyStates.a) vectors.push({ scalar: 1, direction: Math.PI });
        if (keyStates.s) vectors.push({ scalar: 1, direction: (3 * Math.PI) / 2 });
        if (keyStates.d) vectors.push({ scalar: 1, direction: 0 });

        let resp = add_vectors(...vectors);
        adventurer.move_vector = { ...resp, scalar: resp.scalar > 1 ? 1 : resp.scalar };
    }
    window.addEventListener(
        "keydown",
        event => {
            adjustadventurervelocity(event.key, true);
        },
        false
    );
    window.addEventListener(
        "keyup",
        event => {
            adjustadventurervelocity(event.key, false);
        },
        false
    );

    adventurer.width *= 2;
    adventurer.height *= 2;
    world.addEntity(adventurer); // add it to the stage

    for (var i = 0; i < 5; i++) {
        let scroll = new Scroll(spells["Flame"], resources[scrollT.framePath].spritesheet, 20, 20);
        world.addEntity(scroll);
        world.pickupScroll(scroll);
    }

    app.stage = world; // make the world active

    app.ticker.add((delta: number) => {
        // Animation loop
        mouse = app.renderer.plugins.interaction.mouse.global;
        world.tick(delta);
    });
}
