import {wait} from './wait';

export async function playNote(which, instrument) {
  let audio = [];

  for (let i=0; i<which.length; i++) {
    audio.push(new Audio('/aurudition/FluidR3_GM/'+instrument+'/'+which[i]+'.mp3'));
    let audioreadyState = audio[i].readyState;
    while (audioreadyState !== 4) {
      audioreadyState = audio[i].readyState;
      await wait(1);
    }
  }

  for (let i=0; i<which.length; i++) {
    audio[i].play();
    await wait(600);
    if (instrument !== 'acoustic_grand_piano-mp3') {
      audio[i].volume = 0.0;
    }
  }
}
