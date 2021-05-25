const pickRandom = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const turns = [
	new Turn(0, 'Left Flank', 4, [8, 9, 10, 11, 12, 13, 14, 15]),
	new Turn(1, 'Right Flank', 4, [8, 9, 10, 11, 12, 13, 14, 15]),
	new Turn(2, 'Regular TTR', 6, [8, 9, 10, 11, 12, 13, 14, 15]),
	new Turn(3, 'Box TTR', 6),
	new Turn(4, 'Slide TTR on 2', 3),
	new Turn(5, 'Slide TTR on 4', 3),
	new Turn(6, 'Slide TTR on 6', 3),
	new Turn(7, 'Slow Turn 90° to the Left in 8 Counts', 1, [8, 9, 10, 11]),
	new Turn(8, 'Slow Turn 180° to the Left in 8 Counts', 1, [8, 9, 10, 11]),
	new Turn(9, 'Slow Turn 90° to the Right in 8 Counts', 1, [8, 9, 10, 11]),
	new Turn(10, 'Slow Turn 180° to the Right in 8 Counts', 1, [8, 9, 10, 11]),
	new Turn(11, 'Hats Off, Rest 123', 1, [8, 9, 10, 11, 14, 15]),
]

let turnsWeighted = []
for (turn of turns) {
	for (let i = 0; i < turn.weightedProbability; i++) {
		turnsWeighted.push(turn)
	}
}

const moves = [
	new Move(0, 'Mark Time', (impossibleTurnIds = [4, 5, 6])),
	new Move(
		1,
		'Forward',
		(impossibleTurnIds = []),
		(precededByOf = false),
		(weightedProbability = 4)
	),
	new Move(
		2,
		'Backwards',
		(impossibleTurnIds = [4, 5, 6]),
		(precededByOf = false),
		(weightedProbability = 3)
	),
	new Move(3, '6-to-5', (impossibleTurnIds = [4, 5, 6])),
	new Move(4, '12-to-5', (impossibleTurnIds = [4, 5, 6])),
	new Move(5, '16-to-5', (impossibleTurnIds = [4, 5, 6])),
	// new Move(6, '24-to-5', (impossibleTurnIds = [4, 5, 6])),
	// new Move(7, '32-to-5', (impossibleTurnIds = [4, 5, 6])),
	new Move(
		8,
		'Left Oblique using the 8-to-5 Step',
		(impossibleTurnIds = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10])
	),
	new Move(
		9,
		'Left Oblique using the 6-to-5 Step',
		(impossibleTurnIds = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10])
	),
	new Move(
		10,
		'Right Oblique using the 8-to-5 Step',
		(impossibleTurnIds = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10])
	),
	new Move(
		11,
		'Right Oblique using the 6-to-5 step',
		(impossibleTurnIds = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10])
	),
	new Move(12, 'Left Lateral Slide', (impossibleTurnIds = [0, 1, 4, 5, 6])),
	new Move(13, 'Right Lateral Slide', (impossibleTurnIds = [0, 1, 4, 5, 6])),
	new Move(14, 'Left Horn Slide', (impossibleTurnIds = [0, 1, 2, 4, 5, 6])),
	new Move(15, 'Right Horn Slide', (impossibleTurnIds = [0, 1, 2, 4, 5, 6])),
	new Move(16, 'Side-Steps', (impossibleTurnIds = [4, 5, 6])),
	new Move(17, 'Step-Sides', (impossibleTurnIds = [4, 5, 6])),
	new Move(18, 'Step-Kicks', (impossibleTurnIds = [0, 1, 2, 4, 5, 6])),
]

let movesWeighted = []
for (move of moves) {
	for (let i = 0; i < move.weightedProbability; i++) {
		movesWeighted.push(move)
	}
}

const endMovesWeighted = [
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -2, name: 'Hats-Off Ohio' },
]

const temposWeighted = [100, 120, 120, 120, 144, 144, 144, 160, 160, 180]

const numMoves = 3

const drillHeader = document.getElementById('drill-header')
const drillBody = document.getElementById('drill-body')
const newDrillButton = document.getElementById('new-drill-btn')
const hornsUpSwitch = document.getElementById('horns-up-switch')
const hornsUpSwitchLabel = document.getElementById('horns-up-switch-label')

const appendLineOfDrill = (drillText) => {
	let pNode = document.createElement('p')
	let textNode = document.createTextNode(drillText)
	pNode.appendChild(textNode)
	drillBody.appendChild(pNode)
}

const clearDrill = () => {
	while (drillBody.firstChild) {
		drillBody.removeChild(drillBody.firstChild)
	}
	drillBody.style.display = 'block'
}

const generateDrill = () => {
	clearDrill()

	drillHeader.innerHTML = 'Your drill is:\n'

	let previousMoveId = -1
	let previousTurnId = -1

	for (let i = 1; i <= numMoves; i++) {
		let drill = ''

		let num8s = pickRandom([1, 1, 1, 2])

		let move
		do {
			move = pickRandom(movesWeighted)
			// chose a different move if it is the same move twice in a row, it is in the previous turn's list of impossible moves, or it's starting the drill with an oblique
		} while (
			move.id == previousMoveId ||
			(previousTurnId >= 0 &&
				turns
					.find((element) => element.id == previousTurnId)
					.impossibleMoveIds.includes(move.id)) ||
			(i == 1 && 8 <= move.id && move.id <= 11)
		)
		previousMoveId = move.id

		// no turn after backward marching
		let hasTurn = i == numMoves || (move.id != 2 && pickRandom([true, false]))

		let turn
		if (i < numMoves) {
			turn = move.chooseTurn()
		} else {
			if (hornsUpSwitch.checked) {
				turn = pickRandom(endMovesWeighted)
			} else {
				turn = endMovesWeighted[0]
			}
		}

		previousTurnId = hasTurn ? turn.id : -1

		// only do 1 8 of any Adjusted Step or Oblique
		if (3 <= move.id && move.id <= 11) {
			num8s = 1
		}

		// if Side-Steps or Step-Sides, do 4 (not 1 or 2 8s)
		if (move.id == 16 || move.id == 17) {
			drill += '4 '
		} else {
			drill +=
				num8s +
				' 8' +
				(num8s == 1 ? '' : 's') +
				' ' +
				(move.precededByOf ? 'of ' : '')
		}

		drill += move.name

		appendLineOfDrill(drill)

		hasTurn &&
			appendLineOfDrill(
				turn.name + (hornsUpSwitch.checked && turn.id == -1 ? ', Down' : '')
			)
	}

	appendLineOfDrill('Tempo: ' + pickRandom(temposWeighted) + ' BPM')
}

newDrillButton.addEventListener('click', generateDrill)

hornsUpSwitch.addEventListener('change', (e) => {
	if (hornsUpSwitch.checked) {
		hornsUpSwitchLabel.innerHTML = 'Horns Up'
	} else {
		hornsUpSwitchLabel.innerHTML = 'Horns Down'
	}
})

// ---------------------- Metronome ----------------------

let metronome = new Metronome()
const metronomeButtons = document.getElementsByClassName('metronome-button')

for (metronomeButton of metronomeButtons) {
	metronomeButton.addEventListener('click', (e) => {
		if (metronome.isRunning) {
			if (e.currentTarget.classList.contains('playing')) {
				metronome.stop()
				e.currentTarget.classList.remove('playing')
				e.currentTarget.classList.remove('is-primary')
			} else {
				for (metronomeButton of metronomeButtons) {
					metronomeButton.classList.remove('playing')
					metronomeButton.classList.remove('is-primary')
				}
				metronome.stop()
				metronome.tempo = e.currentTarget.dataset.tempo
				metronome.start()
				e.currentTarget.classList.add('playing')
				e.currentTarget.classList.add('is-primary')
			}
		} else {
			metronome.tempo = e.currentTarget.dataset.tempo
			metronome.start()
			e.currentTarget.classList.add('playing')
			e.currentTarget.classList.add('is-primary')
		}
	})
}
