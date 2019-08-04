import { Container } from "pixi.js";
import { Scroll } from "./scroll";
import { Selector } from "./selector";
import { States } from "./enums";

export class Overlay extends Container {
    handSize = 3;

    deck: Scroll[];
    hand: Scroll[];
    player: Scroll[];
    enemies: {
        [key: string]: Scroll[];
    };

    selected = -1;
    selector: Selector;

    constructor() {
        super();
        this.deck = [];
        this.hand = [null, null, null];
        this.player = [];
        this.enemies = {};

        window.addEventListener(
            "keydown",
            event => {
                this.grabScroll(Number(event.key));
            },
            false
        );

        window.addEventListener(
            "click",
            event => {
                event.button == 0 ? this.useScroll() : this.cancelScroll();
            },
            false
        );
    }

    //Draw scroll from deck
    refillHand() {
        for (var i = 0; i < this.handSize; i++) {
            if (this.hand[i] == null && this.deck.length > 0) {
                let entity = this.deck.shift();
                this.hand[i] = entity;

                entity.state = States.hand;
                entity.arrived = false;
                entity.place = i;
            }
        }
    }

    //Pickup scroll from ground
    pickupScroll(entity: Scroll) {
        this.deck.push(entity);
        this.addChild(entity);

        entity.state = States.deck;
        entity.arrived = false;
        this.refillHand();
    }

    //Grab scroll from hand
    grabScroll(index: number) {
        index--;
        if (this.selected == -1 && index >= 0 && index < this.handSize) {
            this.hand[index].state = States.mouse;
            this.hand[index].arrived = false;
            this.selected = index;
        }
    }

    //Return scroll to hand
    cancelScroll() {
        if (this.selected > -1) {
            this.hand[this.selected].state = States.hand;
            this.selected = -1;
        }
    }

    //Use scroll in hand
    useScroll() {
        if (this.selected > -1) {
            this.hand[this.selected].arrived = true;
            this.hand[this.selected] = null;

            this.selected = -1;
            this.refillHand();
        }
    }
}
