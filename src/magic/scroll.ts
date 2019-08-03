enum Targets {
	self,
	self_area,
	mouse_enemy,
	mouse_proj,
	mouse_cone,
	mouse_area,
	deck
}

enum Symbols {
	sword,
	plus,
	sheild,
	potion,
	flame,
	waves,
	flake
}

enum Stats {
	health,
	attack,
	power,
	range,
	speed,
	duration
}

enum Colors {
	red, 
	blue,
	green,
	white,
	purple
}

export class Scroll {
	//Identifier
	id: string;
	name: string;
	rarity: number;

	//Scroll display
	level: number;
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