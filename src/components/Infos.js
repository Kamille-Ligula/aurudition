import React, { useState, useEffect } from "react";
import {styles} from '../styles/styles.js';

export const Infos = (props) => {
  const [state, setstate] = useState(props);

  useEffect(() => {
    setstate(props);
  }, [props]);

  return (
    <div
    className='innerWindow infosAndSettings'
    style=
      {{
        top: (state.windowHeight*0.06)+'px',
        height: (state.windowHeight*0.55)+'px'
      }}
    >
      <span style={styles.infoTitle}>Key colors: </span>
      <br/>The piano keys may be colored in different ways in order to convey different meanings.
      <ul>
        <li>Black and white are, the basic, normal colors, which don't indicate anything specific.</li>
        <li><span style={{color:'#999'}}>Greyed</span> out keys are outside of the range, which means that you can
        play them if you want, but the algorithm will not use them for tests.</li>
        <li><span style={{color:'#454ACE'}}>Blue</span> keys are hints (if applicable).</li>
        <li><span style={{color:'red'}}>Red</span> keys are wrong answers (check "Color right & wrong" to activate it).</li>
        <li><span style={{color:'green'}}>Green</span> keys are right answers (check "Color right & wrong" to
        activate it).</li>
        <li><span style={{color:'#B9C12F'}}>Yellow</span> keys are answers if you clicked on the "Show answer button".</li>
      </ul>

      <p/>
      <span style={styles.infoTitle}>Range:</span>
      <br/>The maximum range based on which the algorithm will randomly pick notes and chords depending on your requests.

      <p/>
      <span style={styles.infoTitle}>Buttons:</span>
      <ul>
        <li>Play a random note: As the name implies, it play and lets you guess one single note.
        Though it may look straightforward, this method is actually meant to be used at an
        advanced level to train perfect pitch.</li>
        <li>Play a random sequence: It plays two notes, with the first one appearing on the
        piano keyboard as a hint, and lets you try and guess the second one. This is meant to be used to
        train relative pitch and should be the place to start for beginners. Though any range configuration is
        allowed for this exercise, we recommend practicing with a one-octave range.</li>
        <li>Play a random chord: This button, somewhat hidden, is meant to be used at a fairly advanced level.
        It asks the algorithm to
        play a random chord and lets you guess which notes comprise it.
        To make it viewable and clickable you'll need to modify the playable range so that it fits a 20-semitone
        range or larger. A larger range is recommended, as it means less repetition of identical chords,
        especially for those that span
        over a larger range, such as the major 9th, the major 11th, and the major ♯11th. Also,
        checking the "Color right and wrong answers"
        setting is
        highly recommended here, as this challenge might turn into a near-impossible mission without it.</li>
        <li>Repeat (🔁): Repeat the question.</li>
        <li>Show answer: This one shoud speak for itself: it simply shows the answer to the question.</li>
      </ul>

      <p/>
      <span style={styles.infoTitle}>Settings:</span>
      <p/><span style={styles.infoTitle2}>Instruments:</span>
      <br/>Above a thousand types of instrument sounds can be chosen thanks to the <a target="_blank" href='https://www.npmjs.com/package/webaudiofont'>WebAudioFont MIDI library</a>.
      <p/><span style={styles.infoTitle2}>Color right and wrong answers:</span>
      <br/>A setting that allows the algorithm to indicate whether the keys you tried to click
      do not correspond to the note(s) you are looking for, in which case they will be colored red, or whether
      they correspond, in which case they'll be colored green and the algorithm will automatically consider that
      you found the correct answer. If left unchecked, no such help will be provided and you'll need to
      manually click on the "show answer" button in order to check your answers.
      <p/><span style={styles.infoTitle2}>Chords:</span>
      <br/>You can select the chords on which the algrithm can test you individually. The four
      most basic ones (major, minor, diminished, augmented) can not be unchecked. More advanced musicians can add
      major 7th, dominant 7th, minor 7th, and major 9th to the list. The remaining six (half diminished,
      fully diminished, major 11th, major ♯11th, suspended 2, suspended 4) being there for true fearless Spartans.

      <p style={{textAlign: 'center'}}>Aurudition © Samuel LUC, 2022 - <a target="_blank" href='https://github.com/Kamille-Ligula/aurudition'>https://github.com/Kamille-Ligula/aurudition</a></p>
    </div>
  )
}
