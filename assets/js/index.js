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
let turnsTurnedOn = new Set()
for (turn of turns) {
	for (let i = 0; i < turn.weightedProbability; i++) {
		turnsWeighted.push(turn)
	}
	turnsTurnedOn.add(turn.id)
}

const turnOptions = [
	{
		label: 'Left and Right Flanks',
		ids: [0, 1],
	},
	{
		label: 'Regular TTR',
		ids: [2],
	},
	{
		label: 'Box TTR',
		ids: [3],
	},
	{
		label: 'Slide TTRs',
		ids: [4, 5, 6],
	},
	{
		label: 'Slow Turns',
		ids: [7, 8, 9, 10],
	},
	{
		label: 'Hats Off',
		ids: [11],
	},
]

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
	new Move(6, 'Backward 12-to-5', (impossibleTurnIds = [4, 5, 6])),
	new Move(7, 'Backward 16-to-5', (impossibleTurnIds = [4, 5, 6])),
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
let movesTurnedOn = new Set()
for (move of moves) {
	for (let i = 0; i < move.weightedProbability; i++) {
		movesWeighted.push(move)
	}
	movesTurnedOn.add(move.id)
}

const moveOptions = [
	{
		label: 'Mark Time',
		ids: [0],
	},
	{
		label: 'Forward',
		ids: [1],
	},
	{
		label: 'Backward',
		ids: [2],
	},
	{
		label: '6-to-5',
		ids: [3],
	},
	{
		label: 'Adjusted Step',
		ids: [4, 5, 6, 7],
	},
	{
		label: 'Obliques',
		ids: [8, 9, 10, 11],
	},
	{
		label: 'Lateral Slides',
		ids: [12, 13],
	},
	{
		label: 'Horn Slides',
		ids: [14, 15],
	},
	{
		label: 'Side-Steps & Step-Sides',
		ids: [16, 17],
	},
	{
		label: 'Step-Kicks',
		ids: [18],
	},
]

const endMovesWeighted = [
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -1, name: 'Halt Kick' },
	{ id: -2, name: 'Hats-Off Ohio' },
]

const temposWeighted = [100, 120, 120, 120, 144, 144, 144, 160, 160, 180]

// ---------------------- DOM elements ----------------------

const drillHeader = document.getElementById('drill-header')
const drillBody = document.getElementById('drill-body')

const newDrillButton = document.getElementById('new-drill-btn')

const optionsDropdownButton = document.getElementById('options-dropdown-btn')
const optionsDropdown = document.getElementById('options-dropdown')

const hornsUpSwitch = document.getElementById('horns-up-switch')
const hornsUpSwitchLabel = document.getElementById('horns-up-switch-label')

const numMovesSlider = document.getElementById('num-moves-slider')
const numMovesLabel = document.getElementById('num-moves-label')

const moveOptionsElement = document.getElementById('move-options')
const turnOptionsElement = document.getElementById('turn-options')

// ---------------------- Generating Drill ----------------------

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

const throwDrillError = () => {
	clearDrill()

	drillHeader.innerHTML = 'Error'

	drillBody.innerHTML =
		'Impossible drill parameters! 😵<br><br>Adjust options and try again.'
}

const generateDrill = () => {
	clearDrill()

	drillHeader.innerHTML = 'Your drill is:\n'

	let previousMoveId = -1
	let previousTurnId = -1

	const numMoves = numMovesSlider.value

	let errorIterationCounter = 0
	const maxIterationsBeforeError = 500

	for (let i = 1; i <= numMoves; i++) {
		let drill = ''

		let num8s = pickRandom([1, 1, 1, 2])

		let move
		do {
			move = pickRandom(movesWeighted)
			errorIterationCounter++
			// chose a different move if it is not turned on, is the same move twice in a row, is in the previous turn's list of impossible moves, or is starting the drill with an oblique
		} while (
			errorIterationCounter < maxIterationsBeforeError &&
			(!movesTurnedOn.has(move.id) ||
				move.id == previousMoveId ||
				(previousTurnId >= 0 &&
					turns
						.find((element) => element.id == previousTurnId)
						.impossibleMoveIds.includes(move.id)) ||
				(i == 1 && 8 <= move.id && move.id <= 11))
		)
		previousMoveId = move.id

		if (errorIterationCounter >= maxIterationsBeforeError) {
			throwDrillError()
			return
		}

		// no turn after backward marching
		let hasTurn = i == numMoves || (move.id != 2 && pickRandom([true, false]))

		let turn
		if (i < numMoves) {
			do {
				turn = move.chooseTurn()
				errorIterationCounter++
			} while (
				errorIterationCounter < maxIterationsBeforeError &&
				!turnsTurnedOn.has(turn.id)
			)
		} else {
			if (hornsUpSwitch.checked && turnsTurnedOn.has(11)) {
				turn = pickRandom(endMovesWeighted)
			} else {
				turn = endMovesWeighted[0]
			}
		}

		if (errorIterationCounter >= maxIterationsBeforeError) {
			throwDrillError()
			return
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

// ---------------------- Horns Up Switch ----------------------

hornsUpSwitch.addEventListener('change', (e) => {
	if (hornsUpSwitch.checked) {
		hornsUpSwitchLabel.innerHTML = 'Horns Up'
	} else {
		hornsUpSwitchLabel.innerHTML = 'Horns Down'
	}
})

// ---------------------- Num Moves Slider ----------------------
numMovesSlider.addEventListener('input', (e) => {
	numMovesLabel.innerText =
		numMovesSlider.value + ' move' + (numMovesSlider.value > 1 ? 's' : '')
})

// ---------------------- Moves and Turns Checkboxes ----------------------
const createCheckbox = (item, containter) => {
	let label = document.createElement('label')
	label.className = 'checkbox'

	let checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.checked = true

	let labelText = document.createTextNode(' ' + item.label)

	label.appendChild(checkbox)
	label.appendChild(labelText)

	containter.appendChild(label)

	return checkbox
}

for (move of moveOptions) {
	const thisMove = move
	createCheckbox(thisMove, moveOptionsElement).addEventListener(
		'change',
		(e) => {
			console.log(thisMove)
			for (moveId of thisMove.ids) {
				if (e.currentTarget.checked) {
					movesTurnedOn.add(moveId)
				} else {
					movesTurnedOn.delete(moveId)
				}
			}
		}
	)
}

for (turn of turnOptions) {
	const thisTurn = turn
	createCheckbox(thisTurn, turnOptionsElement).addEventListener(
		'change',
		(e) => {
			console.log(thisTurn)
			for (turnId of thisTurn.ids) {
				if (e.currentTarget.checked) {
					turnsTurnedOn.add(turnId)
				} else {
					turnsTurnedOn.delete(turnId)
				}
			}
		}
	)
}

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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
optionsDropdownButton.addEventListener('click', () => {
	optionsDropdown.classList.toggle('is-active')
})

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (e) => {
	if (!optionsDropdown.contains(e.target)) {
		if (optionsDropdown.classList.contains('is-active')) {
			optionsDropdown.classList.remove('is-active')
		}
	}
})
