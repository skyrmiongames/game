import { parse } from 'papaparse';
import { readFileSync } from 'fs';
import { Targets, Symbols, Stats } from './enums';

const file = readFileSync('./magic/spells.csv', 'utf8');
var scrolls: Scroll;
parse(file, {complete: (result) => scrolls});

export class Scroll {
	//Identifier
	id: string;
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

	constructor(scroll: Scroll) {
		this.symbol = scroll.symbol;
		this.stat = scroll.stat;
		this.power = scroll.power;
		this.duration = 60;
	}
}