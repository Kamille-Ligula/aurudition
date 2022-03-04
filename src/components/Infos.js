import React, { useState, useEffect } from "react";
import {
  infoTitle,
  infoTitle2,
} from '../styles/styles.js';

export const Infos = (props) => {
  const [state, setstate] = useState(props);

  useEffect(() => {
    setstate(props);
  }, [props]);

  return (
    <div className='innerWindow infosAndSettings' style={{height: 78-state.whiteHeight+'vh'}}>
      <span style={infoTitle}>Key colors: </span>
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
      <span style={infoTitle}>Notation systems:</span>
      <br/>(The default being the English system, it is also the one I'm using in this section):
      <ul>
        <li>English (C, D, E, F, G, A, B)</li>
        <li>German (C, D, E, F, G, A, H)</li>
        <li>Italian (do, re, mi, fa, sol, la, si)</li>
      </ul>

      <p/>
      <span style={infoTitle}>Instruments:</span>
      <br/>Many choices of instruments and sounds are available, thanks to the library made available by Benjamin
      Gleitzman here: <a href='https://github.com/gleitz/midi-js-soundfonts/tree/gh-pages/FluidR3_GM'>
      https://github.com/gleitz/midi-js-soundfonts/tree/gh-pages/FluidR3_GM</a>.

      <p/>
      <span style={infoTitle}>Range:</span>
      <br/>The maximum range based on which the algorithm will randomly pick notes and chords depending on your requests.
      Practicing recognizing chords requires
      a 20-semitone range configuration or larger.

      <p/>
      <span style={infoTitle}>Buttons:</span>
        <ul>
          <li>Play a random note: As the name implies, it play and lets you guess one single note.
          Though it may look straightforward, this method is actually meant to be used at an
          advanced level to train perfect pitch.</li>
          <li>Play two random notes: As the name implies, it plays two notes, with the first one appearing on the
          piano keyboard as a hint, and lets you try and guess the second one. This is meant to be used to
          train relative pitch and should be the place to start for beginners.</li>
          <li>Play a random chord. This button, somewhat hidden, is meant to be used at a fairly advanced level, too.
          To make it viewable and clickable you'll need to modify the playable range so that it fits a 20-semitone
          range or larger. It asks the algorithm to
          play a random chord and lets you guess which notes comprise it. Checking the "Color right and wrong answers"
          setting is
          highly recommended here, as this challenge might turn into a near-impossible mission without it.</li>
          <li>Repeat: Repeat the question.</li>
          <li>Show answer: This one shoud speak for itself: it simply shows the answer to the question.</li>
        </ul>

      <p/>
      <span style={infoTitle}>Settings:</span>
      <br/><span style={infoTitle2}>Color right and wrong answers:</span>
      <br/>A setting that allows the algorithm to indicate whether the keys you tried to click
      do not correspond to the note(s) you are looking for, in which case they will be colored red, or whether
      they correspond, in which case they'll be colored green and the algorithm will automatically consider that
      you found the correct answer. If left unchecked, no such help will be provided and you'll need to
      manually click on the "show answer" button in order to check your answers.
      <p/><span style={infoTitle2}>Chords:</span>
      <br/>You can select the chords on which the algrithm can test you individually. The four
      most basic ones (major, minor, diminished, augmented) can not be unchecked. More advanced musicians can add
      major 7th, dominant 7th, minor 7th, and major 9th to the list. The remaining six (half diminished,
      fully diminished, major 11th, major ♯11th, suspended 2, suspended 4) being there for true fearless Spartans.

      <p style={{textAlign: 'center'}}>Aurudition © Samuel LUC, 2022 - https://github.com/Kamille-Ligula/aurudition</p>
    </div>
  )
}
