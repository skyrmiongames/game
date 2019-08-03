import { Container } from "pixi.js";
import { ScrollEntity } from "./scroll";
import { States } from "./enums";

export class Overlay extends Container {
    handSize = 3;

    deck: ScrollEntity[];
    hand: ScrollEntity[];
    player: ScrollEntity[];
    enemies: {
        [key: string]: ScrollEntity[];
    };

    selected = -1;

    constructor() {
        super();
        this.deck = [];
        this.hand = [null, null, null, null];
        this.player = [];
        this.enemies = {};
    }

    //Draw scroll from deck
    refillHand() {
        for (var i = 0; i < this.handSize; i++) {
            if (this.hand[i] == null) {
                let entity = this.deck.shift();
                this.hand[i] = entity;

                entity.state = States.hand;
                entity.arrived = false;
                entity.place = i;
            }
        }
    }

    //Pickup scroll from ground
    pickupScroll(entity: ScrollEntity) {
        this.deck.push(entity);
        this.addChild(entity);

        entity.state = States.deck;
        entity.arrived = false;
        this.refillHand();
    }

    //Grab scroll from hand
    grabScroll(index: number) {
        this.hand[index].state = States.mouse;
        this.hand[index].arrived = false;
        this.selected = index;
    }

    //Return scroll to hand
    cancelScroll() {
        this.hand[this.selected].state = States.hand;
        this.selected = -1;
    }
}
