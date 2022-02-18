export function playNote(which, instrument) {
  const audio = new Audio('./FluidR3_GM/'+instrument+'/'+which+'.mp3');
  audio.play();
}
