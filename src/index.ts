import { Application, IResourceDictionary, Loader, Sprite } from "pixi.js";
import "./main.css";

const app = new Application({
	// Create the Pixi base
	resizeTo: window,
	resolution: 1,
	antialias: false,
});
document.body.appendChild(app.view); // Inject it

Loader.shared
	.add([
		require("../res/sprite/adventurer-idle-00.png"), // must use webpack require
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

	let adventurer = new Sprite(obj[require("../res/sprite/adventurer-idle-00.png")].texture); //create sprite
	// adventurer.alpha = 0; // make it invisible

	app.stage.addChild(adventurer); // add it to the stage
}
