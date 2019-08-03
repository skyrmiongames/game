import { parse } from "papaparse";
import { Targets, Symbols, Stats } from "./enums";

export var scrolls: {
	[key: string]: ScrollData;
};

//Convert csv into scroll map
parse("res/text/spells.csv", {
	complete: result =>
		(scrolls = result.data.reduce(function(map, obj) {
			map[obj.name] = obj;
			return map;
		}, {})),
	download: true,
	delimiter: ",",
	header: true,
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
