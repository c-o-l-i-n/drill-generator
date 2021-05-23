class Move {
	constructor(
		id,
		name,
		impossibleTurnIds = [],
		precededByOf = true,
		weightedProbability = 1
	) {
		this.id = id
		this.name = name
		this.impossibleTurnIds = impossibleTurnIds
		this.precededByOf = precededByOf
		this.weightedProbability = weightedProbability
	}

	chooseTurn() {
		let turn = pickRandom(turnsWeighted)
		while (this.impossibleTurnIds.includes(turn.id)) {
			turn = pickRandom(turnsWeighted)
		}
		return turn
	}
}
