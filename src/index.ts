import { Application } from "pixi.js";
import "./main.css";

const app = new Application();

document.body.appendChild(app.view);

app.renderer.autoResize = true;
