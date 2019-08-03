import { parse } from "papaparse";
import { readFileSync } from "fs";
import { v4 } from "uuid";
import { Targets, Symbols, Stats } from "./enums";

var scrolls: {
    [key: string]: ScrollData;
};

//Convert csv into scroll map
const file = readFileSync('src/magic/spells.csv', 'utf8');
parse(file, { 
	complete: (result) => scrolls = result.data.reduce(function(map, obj) {
	    map[obj.name] = obj;
	    return map;
	}, {})
});

export class ScrollData {
	//Identifier
	name: string;
	rarity: number;

	//Scroll display
	level: number;
	target: Targets;
	symbol: Symbols;

	//Spell type
	stat: Stats;
	power: number;
	range: number;

	//Particle features
	speed: number;
	color: string;
	density: number;
}

export class Effect {
	//Spell identifiers
	symbol: Symbols;
	stat: Stats;
	power: number;

	//Running time
	duration: number;

	constructor(scroll: ScrollData) {
		this.symbol = scroll.symbol;
		this.stat = scroll.stat;
		this.power = scroll.power;
		this.duration = 60;
	}
}