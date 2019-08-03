import { Container, Text } from "pixi.js";
import { Button, Group } from "./gui";

export function addMainMenu(container: Container) {
    let startText = new Text("start", { fill: 0xffffff });
    let start = new Button(startText, function () {
        console.log("Starting game");
    })

    let optionsText = new Text("options", { fill: 0xffffff });
    optionsText.position.set(0, 30);
    let options = new Button(optionsText, function () {
        console.log("Options");
    })

    let mainMenu = new Group([start, options]);

    mainMenu.sprites().forEach((child) => container.addChild(child))

    container.on("mousedown", function(e: any) {
        let event: PointerEvent = e.data.originalEvent;
        console.log(`Clicked x=${event.clientX} y=${event.clientY}`);
        mainMenu.doClick(event);
    });
}
