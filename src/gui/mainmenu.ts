import { Text } from "pixi.js";
import { Button, Group } from ".";

const startText = new Text("start", { fill: 0xffffff });
export const start = new Button(startText, () => {
    console.log("Starting game");
});

const optionsText = (() => {
    const text = new Text("options", { fill: 0xffffff });
    text.position.set(0, 30);
    return text;
})();

export const options = new Button(optionsText, () => {
    console.log("Options");
});

export const mainMenu = new Group([start, options]);
