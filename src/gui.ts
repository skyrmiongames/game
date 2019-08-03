import { Sprite, Text } from "pixi.js";

export interface Gui {
    doClick(event: PointerEvent): void;
    sprites(): Sprite[];
}

export class Button implements Gui {
    text: Text;
    onClick: () => void;

    constructor(text: Text, onClick: () => void) {
        this.text = text;
        this.onClick = onClick;
    }

    doClick(event: PointerEvent): void {
        let x = this.text.x;
        let y = this.text.y;
        let width = this.text.width;
        let height = this.text.height;
        if (x <= event.clientX && event.clientX <= x + width) {
            if (y <= event.clientY && event.clientY <= y + height) {
                this.onClick();
            }
        }
    }

    sprites(): Sprite[] {
        return [this.text];
    }
}

export class Group implements Gui {
    children: Gui[];

    constructor(children: Gui[]) {
        this.children = children;
    }

    doClick(event: PointerEvent): void {
        this.children.forEach((child) => child.doClick(event));
    }

    sprites(): Sprite[] {
        return this.children.map((child) => child.sprites()).flat();
    }
}
