const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

let divisor = windowWidth/windowHeight*8;

export const whiteWidth = 48/divisor;
export const blackWidth = 28/divisor;
export const barWidth = 337/divisor;
export const barHeight = 38/8;
export const whiteHeight = 202/8;
export const blackHeight = 118/8;
const baseOctavePosition = 84/divisor;
const octavePositionDiff = whiteWidth*7;
const baseBottomPosition = 0;

export const naturals = {
  position: 'absolute',
  bottom: baseBottomPosition,
}

export const accidentals = {
  position: 'absolute',
  bottom: whiteHeight-blackHeight+baseBottomPosition,
}

export const pitches = {
  position: 'absolute',
  bottom: whiteHeight+baseBottomPosition,
}

export const notes = {
  C: {
    classification: naturals,
    position: whiteWidth*0,
    width: whiteWidth,
    height: whiteHeight,
  },
  D: {
    classification: naturals,
    position: whiteWidth*1,
    width: whiteWidth,
    height: whiteHeight,
  },
  E: {
    classification: naturals,
    position: whiteWidth*2,
    width: whiteWidth,
    height: whiteHeight,
  },
  F: {
    classification: naturals,
    position: whiteWidth*3,
    width: whiteWidth,
    height: whiteHeight,
  },
  G: {
    classification: naturals,
    position: whiteWidth*4,
    width: whiteWidth,
    height: whiteHeight,
  },
  A: {
    classification: naturals,
    position: whiteWidth*5,
    width: whiteWidth,
    height: whiteHeight,
  },
  B: {
    classification: naturals,
    position: whiteWidth*6,
    width: whiteWidth,
    height: whiteHeight,
  },
  Db: {
    classification: accidentals,
    position: blackWidth*1,
    width: blackWidth,
    height: blackHeight,
  },
  Eb: {
    classification: accidentals,
    position: blackWidth*3,
    width: blackWidth,
    height: blackHeight,
  },
  Gb: {
    classification: accidentals,
    position: blackWidth*6,
    width: blackWidth,
    height: blackHeight,
  },
  Ab: {
    classification: accidentals,
    position: blackWidth*8,
    width: blackWidth,
    height: blackHeight,
  },
  Bb: {
    classification: accidentals,
    position: blackWidth*10,
    width: blackWidth,
    height: blackHeight,
  }
}

export const octaves = [
  baseOctavePosition-octavePositionDiff*1,
  baseOctavePosition+octavePositionDiff*0,
  baseOctavePosition+octavePositionDiff*1,
  baseOctavePosition+octavePositionDiff*2,
  baseOctavePosition+octavePositionDiff*3,
  baseOctavePosition+octavePositionDiff*4,
  baseOctavePosition+octavePositionDiff*5,
  baseOctavePosition+octavePositionDiff*6,
];
