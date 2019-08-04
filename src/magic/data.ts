import { Stats, Symbols, Targets } from "./enums";
import { parse } from "papaparse";

export var spells: {
	[key: string]: Spell;
};

//Convert csv into scroll map
parse("res/text/spells.csv", {
	complete: result =>
		(spells = result.data.reduce(function(map, obj) {
			map[obj.name] = obj;
			console.log(obj);
			return map;
		}, {})),
	download: true,
	delimiter: ",",
	header: true,
});

export interface Spell {
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

	//Particle features
	speed: number;
	color: string;
	density: number;
}
