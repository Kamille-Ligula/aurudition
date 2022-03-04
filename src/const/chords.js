const base = 0

const chordTypes = [
  // Triads
  {
    name: 'major',
    short: '',
    notes: [base, base+4, base+4+3],
    explanation: 'root, major 3rd, perfect 5th',
  },
  {
    name: 'minor',
    short: '',
    notes: [base, base+3, base+3+4],
    explanation: 'root, minor 3rd, perfect 5th',
  },
  {
    name: 'diminished',
    short: '',
    notes: [base, base+3, base+3+3],
    explanation: 'root, minor 3rd, diminished 5th',
  },
  {
    name: 'augmented',
    short: '',
    notes: [base, base+4, base+4+4],
    explanation: 'root, major 3rd, augmented 5th',
  },
  // Four-note chords
  {
    name: 'major 7th',
    short: 'maj7',
    notes: [base, base+4, base+4+3, base+12-1],
    explanation: 'root, major 3rd, perfect 5th, major 7th',
  },
  {
    name: 'dominant 7th',
    short: '7',
    notes: [base, base+4, base+4+3, base+12-2],
    explanation: 'root, major 3rd, perfect 5th, minor 7th',
  },
  {
    name: 'minor 7th',
    short: 'm7',
    notes: [base, base+3, base+3+4, base+3+4+3],
    explanation: 'root, minor 3rd, perfect 5th, minor 7th',
  },
  // Others
  {
    name: 'major 9th',
    short: 'maj9',
    notes: [base, base+4, base+4+3, base+12+2],
    explanation: 'root, major 3rd, perfect 5th, major 9th',
  },
  {
    name: 'half diminished',
    short: 'Ø',
    notes: [base, base+3, base+3+3, base+3+3+4],
    explanation: 'root, minor 3rd, diminished 5th, flat 7th',
  },
  {
    name: 'fully diminished',
    short: '°',
    notes: [base, base+3, base+3+3, base+3+3+3],
    explanation: 'root, minor 3rd, diminished 5th, diminished 7th',
  },
  {
    name: 'major 11th',
    short: 'maj11',
    notes: [base, base+4, base+4+3, base+12+5],
    explanation: 'root, major 3rd, perfect 5th, 11th',
  },
  {
    name: 'major ♯11th',
    short: 'maj7♯11',
    notes: [base, base+4, base+4+3, base+12+6],
    explanation: 'root, major 3rd, perfect 5th, ♯11th',
  },
  {
    name: 'suspended 2',
    short: 'sus2',
    notes: [base, base+2, base+7],
    explanation: 'root, major 2nd, perfect 5th',
  },
  {
    name: 'suspended 4',
    short: 'sus4',
    notes: [base, base+5, base+7],
    explanation: 'root, perfect 4th, perfect 5th',
  },
]

export {chordTypes};
