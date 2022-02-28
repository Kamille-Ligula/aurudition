import React, { useState, useEffect } from "react";
import {notes, notesDictionary, octavesDictionary, fullPiano} from '../const/notes';
import {playRandomNote} from '../lib/playRandomNote';
import {playNote} from '../lib/playNote';
import {chords} from '../const/chords';
import {getRandomInt} from '../lib/getRandomInt';
import {playChord} from '../lib/playChord';
import {instruments} from '../const/instruments';
import {
  noteButton,
  selectionButton,
  noteText,
  notesAndAnswers,
  noteButtonVertical,
  selectionButtonVertical,
  noteTextVertical,
  clueStyle,
  answerStyle,
  manuallyFoundStyle,
  textVertical,
  text,
  checkboxSizeVertical,
  checkboxSize
} from '../styles/styles.js';
import '../styles/styles.css';

export const Controls = (props) => {
  const [state, setstate] = useState(props);
  const [notesNaming, setnotesNaming] = useState(localStorage.getItem("notesNaming") || 0);
  const [riddleName, setriddleName] = useState('');

  useEffect(() => {
    setstate(props);

    if (localStorage.getItem("showRedAndGreenKeys") === 'false') {
      document.getElementById("colorKeys").defaultChecked = false;
      props.setshowRedAndGreenKeys(false);
    }
    else {
      document.getElementById("colorKeys").defaultChecked = true;
      props.setshowRedAndGreenKeys(true);
    }
  }, [props]);

  function showAnswer() {
    props.setanswer(true);
  }

  async function askForNotes(number) {
    const randomCombination = [];

    for (let i=0; i<number; i++) {
      randomCombination.push(playRandomNote(state.lowerNoteAndPitch, state.higherNoteAndPitch));
    }

    props.setanswer(false);
    props.setmanualFinding(false);
    props.setmanualChordFinding([false, false, false]);

    props.setriddle(randomCombination);
    setriddleName('');

    playNote(randomCombination, state.instrument);
  }

  async function askForChords() {
    const randomChordData = chords[getRandomInt(chords.length)];
    const randomChordNotes = [...randomChordData.notes];
    const randomChordName = [...randomChordData.name];

    const memory = [];
    let whichOctave = state.lowerNoteAndPitch.slice(-1);

    for (let i=0; i<randomChordNotes.length; i++) {
      memory.push(notes.indexOf(randomChordNotes[i]));
      if (memory[i-1] > notes.indexOf(randomChordNotes[i])) {
        whichOctave++;
      }
      randomChordNotes[i] = randomChordNotes[i]+whichOctave;
    }

    props.setanswer(false);
    props.setmanualFinding(false);
    props.setmanualChordFinding([false, false, false]);

    props.setriddle(randomChordNotes);
    setriddleName(randomChordName);

    playChord(randomChordNotes, state.instrument);
  }

  const handleChange = (e) => {
    props.setshowRedAndGreenKeys(e.target.checked);
    localStorage.setItem("showRedAndGreenKeys", e.target.checked);
  };

  let isVertical: boolean = (state.windowWidth/state.windowHeight < 1);

  function pickInstrument(which) {
    props.setinstrument(which);
    localStorage.setItem("instrument", which);
  }

  return (
    <div className='getNoteButtons'>
      {/* Notes naming convention */}
      <select style={isVertical ? selectionButtonVertical : selectionButton} value={notesNaming} id="conventionsList" onChange={(e) => { setnotesNaming(e.target.value); localStorage.setItem("notesNaming", e.target.value); }}>
        {
          ['English notation', 'German notation', 'Italian notation'].map((convention, conventionIndex) => (
            <option key={convention+conventionIndex} value={conventionIndex}>{convention}</option>
          ))
        }
      </select>

      {/* Instrument and range */}
      <div>
        <select style={isVertical ? selectionButtonVertical : selectionButton} value={state.instrument} id="instrumentsList" onChange={(e) => { pickInstrument(e.target.value) }}>
          {
            instruments.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
        <span style={isVertical ? textVertical : text}> Range: </span>
        <select style={isVertical ? selectionButtonVertical : selectionButton} value={state.lowerNoteAndPitch} id="notesList" onChange={(e) => { props.setlowerNoteAndPitch(e.target.value); localStorage.setItem("lowerNoteAndPitch", e.target.value); }}>
          {
            octavesDictionary.map((pitch, pitchIndex) => (
              notes.filter(function(item, index) {
                if ((pitchIndex!==0 || item==='A' || item==='Bb' || item==='B') &&
                (fullPiano.indexOf(item+pitchIndex) < fullPiano.indexOf(state.higherNoteAndPitch))) { return true }
                else { return false }
              }).map((note) => (
                <option key={note+pitchIndex} value={note+pitchIndex}>{notesDictionary[note][notesNaming]+pitch}</option>
              ))
            ))
          }
        </select>
        <span style={isVertical ? textVertical : text}> - </span>
        <select style={isVertical ? selectionButtonVertical : selectionButton} value={state.higherNoteAndPitch} id="notesList" onChange={(e) => { props.sethigherNoteAndPitch(e.target.value); localStorage.setItem("higherNoteAndPitch", e.target.value); }}>
          {
            octavesDictionary.map((pitch, pitchIndex) => (
              notes.filter(function(item, index) {
                if ((pitchIndex!==0 || item==='A' || item==='Bb' || item==='B') &&
                (fullPiano.indexOf(item+pitchIndex) > fullPiano.indexOf(state.lowerNoteAndPitch))) { return true }
                else { return false }
              }).map((note) => (
                <option key={note+pitchIndex} value={note+pitchIndex}>{notesDictionary[note][notesNaming]+pitch}</option>
              ))
            ))
          }
        </select>
      </div>

      {/* Color keys Option */}
      <div style={isVertical ? textVertical : text}>
        <label>
          <br/>Color right & wrong: <input style={isVertical ? checkboxSizeVertical : checkboxSize} type="checkbox" className="checkbox" id="colorKeys" onClick={handleChange} />
        </label>
      </div>

      {/* Random notes buttons */}
      {
        state.riddle.length >= 3 && !state.answer ? // chord
          <div>
            {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { showAnswer() }} />
            {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { playChord(state.riddle, state.instrument) }} />
          </div>
        :
          state.riddle.length >= 1 && state.riddle.length < 3 && !state.answer ? // one or two separate notes
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { showAnswer() }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { playNote(state.riddle, state.instrument) }} />
            </div>
          :
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random note" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(1) }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play two random notes" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(2) }} />
              {
                (parseInt(state.higherNoteAndPitch.slice(-1)) - parseInt(state.lowerNoteAndPitch.slice(-1)) >= 2 &&
                state.higherNoteAndPitch.slice(0, -1) === 'C' && state.lowerNoteAndPitch.slice(0, -1) === 'C') &&
                  <span>
                    {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random chord" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForChords() }} />
                  </span>
              }
            </div>
      }

      {/* Notes and answers */}
      <div style={notesAndAnswers}>
        {
          state.answer ?
            state.riddle.length === 1 ?
              <div style={isVertical ? noteTextVertical : noteText}>
                <span style={state.manualFinding ? manuallyFoundStyle : answerStyle}>
                  {notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                </span>
              </div>
              :
                state.riddle.length > 1 && state.riddle.length < 3 ?
                  <div style={isVertical ? noteTextVertical : noteText}>
                    <span style={clueStyle}>
                      {notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                    </span>
                    {' - '}
                    <span style={state.manualFinding ? manuallyFoundStyle : answerStyle}>
                      {notesDictionary[state.riddle[1].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[1][state.riddle[1].length-1]]}
                    </span>
                  </div>
                :
                  state.riddle.length >= 3 &&
                    <div style={isVertical ? noteTextVertical : noteText}>
                      <span style={state.manualChordFinding.indexOf(false) === -1 ? manuallyFoundStyle : answerStyle}>
                        {riddleName}
                      </span>
                    </div>
          :
            state.riddle.length === 1 ?
              <div style={isVertical ? noteTextVertical : noteText}>
                ?
              </div>
              : state.riddle.length > 1 && state.riddle.length < 3 ?
                <div style={isVertical ? noteTextVertical : noteText}>
                  <span style={clueStyle}>{notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}</span> - ?
                </div>
                :
                  state.riddle.length >= 3 &&
                    <div style={isVertical ? noteTextVertical : noteText}>
                      ?
                    </div>
        }
      </div>
    </div>
  )
}
