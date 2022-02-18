import {getRandomInt} from './getRandomInt';
import {notes} from '../const/notes';

export function playRandomNote(lowerLimit, higherLimit) {
  const lowerNote = lowerLimit.slice(0, -1);
  const lowerPitch = parseInt(lowerLimit.charAt(lowerLimit.length - 1));

  const higherNote = higherLimit.slice(0, -1);
  const higherPitch = parseInt(higherLimit.charAt(higherLimit.length - 1));

  const range = [];

  for (let j=0; j<=higherPitch-lowerPitch; j++) {
    if (higherPitch-lowerPitch === 0) {
      for (let i=notes.indexOf(lowerNote); i<=notes.indexOf(higherNote); i++) {
        range.push(notes[i]+lowerPitch)
      }
    }
    else if (j === 0) {
      for (let i=notes.indexOf(lowerNote); i<notes.length; i++) {
        range.push(notes[i]+lowerPitch)
      }
    }
    else if (j === higherPitch-lowerPitch) {
      for (let i=0; i<=notes.indexOf(higherNote); i++) {
        range.push(notes[i]+higherPitch)
      }
    }
    else {
      for (let i=0; i<notes.length; i++) {
        let lowerPitchplusj = lowerPitch+j;
        range.push(notes[i]+lowerPitchplusj)
      }
    }
  }

  const randomNote = range[getRandomInt(range.length)];

  return (randomNote);
}
