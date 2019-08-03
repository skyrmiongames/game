import { Sprite, Text, Container } from "pixi.js";

export default interface Gui {
    doClick(event: PointerEvent): void;
    sprites(): Array<Sprite>;
}

export class Button implements Gui {
    readonly text: Text;
    readonly onClick: () => void;

    constructor(text: Text, onClick: () => void) {
        this.text = text;
        this.onClick = onClick;
    }

    doClick(event: PointerEvent) {
        if (this.text.x <= event.clientX && event.clientX <= this.text.x + this.text.width) {
            if (this.text.y <= event.clientY && event.clientY <= this.text.y + this.text.height) {
                this.onClick();
            }
        }
    }

    sprites(): Array<Sprite> {
        return [this.text];
    }
}

export class Group implements Gui {
    readonly children: Array<Gui>;

    constructor(children: Array<Gui>) {
        this.children = children;
    }

    doClick(event: PointerEvent) {
        this.children.forEach(child => child.doClick(event));
    }

    sprites(): Array<Sprite> {
        return this.children.map(child => child.sprites()).flat();
    }
}

export const addGui = (gui: Gui, container: Container) => {
    gui.sprites().forEach(child => container.addChild(child));

    container.on("mousedown", (e: any) => {
        const event: PointerEvent = e.data.originalEvent;
        console.log(`Clicked x=${event.clientX} y=${event.clientY}`);
        gui.doClick(event);
    });
};
