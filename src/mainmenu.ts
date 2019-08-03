import { Container } from "pixi.js";

export function addMainMenu(container: Container) {
    container.on("mousedown", function(e: any) {
        let event: PointerEvent = e.data.originalEvent;
        console.log(`Clicked x=${event.clientX} y=${event.clientY}`);
    });
}
