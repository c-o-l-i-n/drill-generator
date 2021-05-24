class Turn {
	constructor(id, name, weightedProbability = 1, impossibleMoveIds = []) {
		this.id = id
		this.name = name
		this.weightedProbability = weightedProbability
		this.impossibleMoveIds = impossibleMoveIds
	}
}
