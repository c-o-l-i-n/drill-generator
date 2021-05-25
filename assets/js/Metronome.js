// Adapted from code by Grant James
// https://github.com/grantjames/metronome

class Metronome {
	constructor(tempo = 120) {
		this.audioContext = null
		this.tempo = tempo
		this.lookahead = 25 // How frequently to call scheduling function (in milliseconds)
		this.scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec)
		this.nextNoteTime = 0.0 // when the next note is due
		this.isRunning = false
		this.intervalID = null
	}

	nextNote() {
		// Advance current note and time by a quarter note (crotchet if you're posh)
		var secondsPerBeat = 60.0 / this.tempo // Notice this picks up the CURRENT tempo value to calculate beat length.
		this.nextNoteTime += secondsPerBeat // Add beat length to last beat time
	}

	scheduleNote(time) {
		// create an oscillator
		const osc = this.audioContext.createOscillator()
		const envelope = this.audioContext.createGain()

		osc.type = 'sawtooth'
		osc.frequency.value = 2500
		envelope.gain.value = 1

		osc.connect(envelope)
		envelope.connect(this.audioContext.destination)

		osc.start(time)
		osc.stop(time + 0.03)
	}

	scheduler() {
		// while there are notes that will need to play before the next interval, schedule them and advance the pointer.
		while (
			this.nextNoteTime <
			this.audioContext.currentTime + this.scheduleAheadTime
		) {
			this.scheduleNote(this.nextNoteTime)
			this.nextNote()
		}
	}

	start() {
		if (this.isRunning) return

		if (this.audioContext == null) {
			this.audioContext = new (window.AudioContext ||
				window.webkitAudioContext)()
			unmute(this.audioContext)
		}

		this.isRunning = true

		this.nextNoteTime = this.audioContext.currentTime + 0.05

		this.intervalID = setInterval(() => this.scheduler(), this.lookahead)
	}

	stop() {
		this.isRunning = false

		clearInterval(this.intervalID)
	}

	startStop() {
		if (this.isRunning) {
			this.stop()
		} else {
			this.start()
		}
	}
}
