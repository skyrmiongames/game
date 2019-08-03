import { Application, IResourceDictionary, Loader, Sprite } from "pixi.js";
import "./main.css";

const app = new Application({ resizeTo: window, resolution: 1 }); // Create the Pixi base
document.body.appendChild(app.view); // Inject it

Loader.shared
	.add([
		require("../res/sprite/core.png"), // must use webpack require
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

	let core = new Sprite(obj[require("../res/sprite/core.png")].texture);
	core.alpha = 0;

	app.stage.addChild(core);
}
