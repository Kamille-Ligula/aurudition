export async function loadNotes(which, instrument) {
  let audio = [];

  for (let i=0; i<which.length; i++) {
    audio.push(new Audio('/aurudition/FluidR3_GM/'+instrument+'/'+which[i]+'.mp3'));
  }

  for (let i=0; i<which.length; i++) {
    audio[i].volume = 0.0;
    audio[i].load();
  }
}
