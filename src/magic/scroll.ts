enum Targets {
	self,
	self_area,
	mouse_enemy,
	mouse_direction,
	mouse_area,
	next_card
}

enum Symbols {
	sword,
	plus,
	sheild,
	potion,
	flame,
	waves
}

enum Effects {
	damage,
	defence,
	poison,
	power,
	range,
	speed
}

export class Scroll {
	//Identifier
	id: string;
	name: string;

	//Scroll display
	rarity: number;
	symbol: Symbols;

	//Spell type
	instantaneous: boolean;
	target: Targets;
	effect: Effects;

	//Spell power
	power: number;
	range: number;
	speed: number;
	color: number;
	density: number;
}