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
  A: ['A', 'A', 'la'],
  B: ['B', 'H', 'si'],
  C: ['C', 'C', 'do'],
  D: ['D', 'D', 're'],
  E: ['E', 'E', 'mi'],
  F: ['F', 'F', 'fa'],
  G: ['G', 'G', 'sol'],
  /*Ab: ['A♭', 'A♭', 'la♭'],
  Bb: ['B♭', 'H♭', 'si♭'],
  Db: ['D♭', 'D♭', 're♭'],
  Eb: ['E♭', 'E♭', 'mi♭'],
  Gb: ['G♭', 'G♭', 'sol♭'],*/
  Ab: ['G♯/A♭', 'G♯/A♭', 'sol♯/la♭'],
  Bb: ['A♯/B♭', 'A♯/H♭', 'la♯/si♭'],
  Db: ['C♯/D♭', 'C♯/D♭', 'do♯/re♭'],
  Eb: ['D♯/E♭', 'D♯/E♭', 're♯/mi♭'],
  Gb: ['F♯/G♭', 'F♯/G♭', 'fa♯/sol♭'],
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
