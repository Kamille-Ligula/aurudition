export const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const fullPiano = [];
for (let i=0; i<=7; i++) {
  for (let j=0; j<notes.length; j++) {
    if (i !== 0 || (notes[j] ==='A' || notes[j] ==='Bb' || notes[j] ==='B')) {
      fullPiano.push(notes[j]+i);
    }
  }
}

export const converter = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
};

export const notesDictionary = {
  A: ['A', 'A', 'la', '6'],
  B: ['B', 'H', 'si', '7'],
  C: ['C', 'C', 'do', '1'],
  D: ['D', 'D', 're', '2'],
  E: ['E', 'E', 'mi', '3'],
  F: ['F', 'F', 'fa', '4'],
  G: ['G', 'G', 'sol', '5'],
  /*Ab: ['A♭', 'A♭', 'la♭'],
  Bb: ['B♭', 'H♭', 'si♭'],
  Db: ['D♭', 'D♭', 're♭'],
  Eb: ['E♭', 'E♭', 'mi♭'],
  Gb: ['G♭', 'G♭', 'sol♭'],*/
  Ab: ['G♯/A♭', 'G♯/A♭', 'sol♯/la♭', '5♯/6♭'],
  Bb: ['A♯/B♭', 'A♯/B', 'la♯/si♭', '6♯/7♭'],
  Db: ['C♯/D♭', 'C♯/D♭', 'do♯/re♭', '1♯/2♭'],
  Eb: ['D♯/E♭', 'D♯/E♭', 're♯/mi♭', '2♯/3♭'],
  Gb: ['F♯/G♭', 'F♯/G♭', 'fa♯/sol♭', '4♯/5♭'],
};

export const octavesDictionary = [
  '₀',
  '₁',
  '₂',
  '₃',
  '₄',
  '₅',
  '₆',
  '₇',
];

export {fullPiano};
