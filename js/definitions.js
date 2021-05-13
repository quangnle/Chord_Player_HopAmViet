const Vol = new Tone.Volume().toDestination();
Vol.volume.value = 5;	
const Sampler = new Tone.Sampler({
		urls: {
			"C4": "C4.mp3",
			"D#4": "Ds4.mp3",
			"F#4": "Fs4.mp3",
			"A4": "A4.mp3",
		},
		release: 1,
		baseUrl: "https://tonejs.github.io/audio/salamander/",
	}).connect(Vol)
	.toDestination();



const NOTES = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];


const MAJOR = [1,3,4.5];
const MINOR = [1,2.5,4.5];

const MAJOR_6 = [1,3,4.5,5.5]
const MINOR_6 = [1,2.5,4.5,5.5]

const MAJOR_7 = [1,3,4.5,6]
const MINOR_7 = [1,2.5,4.5,6]

const MAJOR_M7 = [1,3,4.5,6.5];
const MINOR_M7 = [1,2.5,4.5,6.5];

const MAJOR_9 = [1,3,4.5,6,8];
const MINOR_9 = [1,2.5,4.5,6,8];

const AUG = [1,3,5];
const AUG7 = [1,3,5,6];

const DIM = [1,2.5,4];
const DIM7 = [1,2.5,4,6];

const SUS_2 = [1,2,4.5];
const SUS_4 = [1,3.5,4.5];

const M7B5 = [1,2.5,4,6.5];

function playSound(keys, delay){
	Tone.loaded().then(() => {
		Sampler.triggerAttackRelease(keys, delay);
	})
}

function playChord(name, delay){
	let keys = getKeysFromChord(name);
	playSound(keys, delay);
}

function getKeyPosition(name){
	name = name.split('/')[0];
	for (let i = 0; i < NOTES.length; i++){
		let names = NOTES[i].split('/');
		for(let j = 0; j < names.length; j++) {
			if (name == names[j]) return i;
		}
	}
}

function transpose(note, val){
	let pos = getKeyPosition(note);
	return NOTES[(pos + NOTES.length + (val * 2)) % NOTES.length];
}

function getKeysFromChord(name){
	let root = name[0];
	if (name[1] == '#' || name[1] == 'b'){
		root += name[1];
		name = name.slice(2, name.length);
	} else {
		name = name.slice(1, name.length);
	}
	
	let seq = null;
	name = name.replace(' ', '');
	if (name.length > 0){
		switch(name) {
			case 'm':
				seq = MINOR;
			break;
			case '7': 
				seq = MAJOR_7;
			break;
			case 'M7': 
			case 'Maj7':
				seq = MAJOR_M7;
			break;
			case 'm7': 
				seq = MINOR_7;
			break;
			case 'mM7': 
				seq = MINOR_M7;
			break;
			case 'aug': 
			case '+':
				seq = AUG;
			break;
			case 'dim': 
			case '-':
				seq = DIM;
			break;
			case '+7': 
			case 'aug7': 
				seq = AUG7;
			break;
			case '-7': 
			case 'dim7': 
				seq = DIM7;
			break;
			case 'sus2':
				seq = SUS_2;
			break
			case 'sus4':
				seq = SUS_4;
			break
			case 'm7b5':
				seq = M7B5;
			break;
		}
	} else {
		seq = MAJOR;
	}
	
	let notes = [];	
	for (let i = 0; i < seq.length; i++){
		let note = transpose(root, seq[i] - 1).split('/')[0] + '4';
		notes.push(note);
	}
	
	return notes;
}