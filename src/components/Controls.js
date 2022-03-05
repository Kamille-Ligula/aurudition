import React, { useState, useEffect } from "react";
import {notes, notesDictionary, octavesDictionary, fullPiano} from '../const/notes';
import {playRandomNote} from '../lib/playRandomNote';
import {playNote} from '../lib/playNote';
import {loadNotes} from '../lib/loadNotes';
import {chordTypes} from '../const/chords';
import {getRandomInt} from '../lib/getRandomInt';
import {playChord} from '../lib/playChord';
import {instruments} from '../const/instruments';
import {styles} from '../styles/styles.js';
import '../styles/styles.css';

export const Controls = (props) => {
  const [state, setstate] = useState(props);
  const [notesNaming, setnotesNaming] = useState(localStorage.getItem("notesNaming") || 0);

  useEffect(() => {
    setstate(props);
  }, [props]);

  function showAnswer() {
    props.setanswer(true);
  }

  async function askForNotes(number) {
    props.setanswer(false);
    props.setmanualFinding(false);
    props.setmanualChordFinding([false, false, false, false]);

    const randomCombination = [];

    for (let i=0; i<number; i++) {
      randomCombination.push(playRandomNote(state.lowerNoteAndPitch, state.higherNoteAndPitch));
    }

    props.setriddle(randomCombination);
    props.setriddleName('');

    playNote(randomCombination, state.instrument);
  }

  async function askForChords() {
    props.setanswer(false);
    props.setmanualFinding(false);

    let randomChordBase;

    const userSelectedChords = [...chordTypes];
    for (let i=chordTypes.length; i>0; i--) {
      if (!state.userChords[i]) {
        userSelectedChords.splice(i, 1);
      }
    }

    const randomChordType = userSelectedChords[getRandomInt(userSelectedChords.length)];

    for (let i=0; i<Infinity; i++) {
      randomChordBase = getRandomInt(
                          fullPiano.indexOf(state.higherNoteAndPitch)-
                          fullPiano.indexOf(state.lowerNoteAndPitch)
                        )+
                        fullPiano.indexOf(state.lowerNoteAndPitch);

      if (fullPiano[randomChordBase + randomChordType.notes[randomChordType.notes.length-1]] &&
      randomChordBase + randomChordType.notes[randomChordType.notes.length-1] <= fullPiano.indexOf(state.higherNoteAndPitch)) {
        break;
      }
    }

    const randomChordName = notesDictionary[fullPiano[randomChordBase].slice(0, -1)][notesNaming]+octavesDictionary[fullPiano[randomChordBase][fullPiano[randomChordBase].length-1]]+' '+randomChordType.name;
    const randomChordNotes = [];
    for (let i=0; i<randomChordType.notes.length; i++) {
      randomChordNotes.push(
        fullPiano[randomChordBase+randomChordType.notes[i]],
      );
    }

    props.setmanualChordFinding(Array(randomChordNotes.length).fill(false));

    props.setriddle(randomChordNotes);
    props.setriddleName(randomChordName);

    playChord(randomChordNotes, state.instrument);
  }

  let isVertical: boolean = (state.windowWidth/state.windowHeight < 1);

  function pickInstrument(which) {
    props.setinstrument(which);
    localStorage.setItem("instrument", which);
  }

  return (
    <div className='innerWindow functionnalButtons' style={{top: '6vh', height: 78-state.whiteHeight+'vh'}}>
      {/* Notes naming convention */}
      <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={notesNaming} id="conventionsList" onChange={(e) => { setnotesNaming(e.target.value); localStorage.setItem("notesNaming", e.target.value); }}>
        {
          ['English notation', 'German notation', 'Italian notation'].map((convention, conventionIndex) => (
            <option key={convention+conventionIndex} value={conventionIndex}>{convention}</option>
          ))
        }
      </select>

      {/* Instrument and range */}
      <div>
        <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={state.instrument} id="instrumentsList" onChange={(e) => { pickInstrument(e.target.value) }}>
          {
            instruments.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
        <span style={isVertical ? styles.textVertical : styles.text}> Range: </span>
        <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={state.lowerNoteAndPitch} id="notesList" onChange={(e) => { props.setlowerNoteAndPitch(e.target.value); localStorage.setItem("lowerNoteAndPitch", e.target.value); loadNotes(fullPiano, state.instrument) }}>
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
        <span style={isVertical ? styles.textVertical : styles.text}> - </span>
        <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={state.higherNoteAndPitch} id="notesList" onChange={(e) => { props.sethigherNoteAndPitch(e.target.value); localStorage.setItem("higherNoteAndPitch", e.target.value); loadNotes(fullPiano, state.instrument) }}>
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

      {/* Random notes buttons */}
      {
        state.riddle.length >= 3 && !state.answer ? // chord
          <div>
            {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { showAnswer() }} />
            {/*{isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { playChord(state.riddle, state.instrument) }} />*/}
          </div>
        :
          state.riddle.length >= 1 && state.riddle.length < 3 && !state.answer ? // one or two separate notes
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { showAnswer() }} />
              {/*{isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { playNote(state.riddle, state.instrument) }} />*/}
            </div>
          :
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random note" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { askForNotes(1) }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random interval" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { askForNotes(2) }} />
              {
                (fullPiano.indexOf(state.higherNoteAndPitch) - fullPiano.indexOf(state.lowerNoteAndPitch) > 18) &&
                  <span>
                    {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random chord" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { askForChords() }} />
                  </span>
              }
            </div>
      }

      {/* Notes and answers */}
      <div style={styles.notesAndAnswers}>
        {
          state.answer ?
            state.riddle.length === 1 ?
              <div onClick={() => { playNote(state.riddle, state.instrument) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                <span style={state.manualFinding ? styles.manuallyFoundStyle : styles.answerStyle}>
                  {notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                  &nbsp;🔁
                </span>
              </div>
              :
                state.riddle.length > 1 && state.riddle.length < 3 ?
                  <div onClick={() => { playNote(state.riddle, state.instrument) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                    <span style={styles.clueStyle}>
                      {notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                    </span>
                    {' - '}
                    <span style={state.manualFinding ? styles.manuallyFoundStyle : styles.answerStyle}>
                      {notesDictionary[state.riddle[1].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[1][state.riddle[1].length-1]]}
                    </span>
                    &nbsp;🔁
                  </div>
                :
                  state.riddle.length >= 3 &&
                    <div onClick={() => { playChord(state.riddle, state.instrument) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                      <span style={state.manualChordFinding.indexOf(false) === -1 ? styles.manuallyFoundStyle : styles.answerStyle}>
                        {state.riddleName}&nbsp;🔁
                      </span>
                    </div>
          :
            state.riddle.length === 1 ?
              <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { playNote(state.riddle, state.instrument) }}>
                ? 🔁
              </div>
              : state.riddle.length > 1 && state.riddle.length < 3 ?
                <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { playNote(state.riddle, state.instrument) }}>
                  <span style={styles.clueStyle}>{notesDictionary[state.riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}</span> - ? 🔁
                </div>
                :
                  state.riddle.length >= 3 &&
                    <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { playChord(state.riddle, state.instrument) }}>
                      ? 🔁
                    </div>
        }
      </div>
    </div>
  )
}
