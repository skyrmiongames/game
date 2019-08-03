enum Targets {
	self,
	self_area,
	mouse_enemy,
	mouse_proj,
	mouse_cone,
	mouse_area,
	next_card
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
	speed
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
	instant: boolean;
	target: Targets;
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
	instant: boolean;
	power: number;

	//Running time
	duration: number;
	
	constructor(scroll: Scroll) {
		this.symbol = scroll.symbol;
		this.stat = scroll.stat;
		this.power = scroll.power;
		this.instant = scroll.instant;

		if(this.instant == true) {
			this.duration = 1;
		} else {
			this.duration = 60;
		}
	}
}