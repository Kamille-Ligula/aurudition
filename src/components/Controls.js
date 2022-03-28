import React, { useState, useEffect } from "react";
import {notes, notesDictionary, octavesDictionary, fullPiano} from '../const/notes';
import {playRandomNote} from '../lib/playRandomNote';
import {chordTypes} from '../const/chords';
import {getRandomInt} from '../lib/getRandomInt';
import {styles} from '../styles/styles.js';
import '../styles/styles.css';

export const Controls = (props) => {
  const [state, setstate] = useState(props);

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

    props.setmidiNotePlaying(randomCombination);
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

    const randomChordName = notesDictionary[fullPiano[randomChordBase].slice(0, -1)][state.notesNaming]+octavesDictionary[fullPiano[randomChordBase][fullPiano[randomChordBase].length-1]]+' '+randomChordType.name;
    const randomChordNotes = [];
    for (let i=0; i<randomChordType.notes.length; i++) {
      randomChordNotes.push(
        fullPiano[randomChordBase+randomChordType.notes[i]],
      );
    }

    props.setmanualChordFinding(Array(randomChordNotes.length).fill(false));

    props.setriddle(randomChordNotes);
    props.setriddleName(randomChordName);

    props.setmidiChordPlaying(randomChordNotes);
  }

  let isVertical: boolean = (state.windowWidth/state.windowHeight < 1);
  let isMobile: boolean = (state.windowWidth <= 1000);

  function onLowerNoteAndPitchChange(e) {
    props.setlowerNoteAndPitch(e.target.value);
    localStorage.setItem("lowerNoteAndPitch", e.target.value);
  }

  function onHigherNoteAndPitchChange(e) {
    props.sethigherNoteAndPitch(e.target.value);
    localStorage.setItem("higherNoteAndPitch", e.target.value);
  }

  return (
    <div className='innerWindow functionnalButtons' style={isVertical ? {top: (state.windowHeight*0.15)+'px', height: (state.windowHeight*0.6)+'px'} : isMobile ? {top: (state.windowHeight*0.07)+'px', height: (state.windowHeight*0.6)+'px'} : {top: (state.windowHeight*0.2)+'px', height: (state.windowHeight*0.6)+'px'}}>
      {/* Range */}
      <span style={isVertical ? styles.textVertical : styles.text}> Range: </span>
      <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={state.lowerNoteAndPitch} id="notesList" onChange={(e) => { onLowerNoteAndPitchChange(e) }}>
        {
          octavesDictionary.map((pitch, pitchIndex) => (
            notes.filter(function(item, index) {
              if ((pitchIndex!==0 || item==='A' || item==='Bb' || item==='B') &&
              (fullPiano.indexOf(item+pitchIndex) < fullPiano.indexOf(state.higherNoteAndPitch))) { return true }
              else { return false }
            }).map((note) => (
              <option key={note+pitchIndex} value={note+pitchIndex}>{notesDictionary[note][state.notesNaming]+pitch}</option>
            ))
          ))
        }
      </select>
      <span style={isVertical ? styles.textVertical : styles.text}> - </span>
      <select style={isVertical ? styles.selectionButtonVertical : styles.selectionButton} value={state.higherNoteAndPitch} id="notesList" onChange={(e) => { onHigherNoteAndPitchChange(e) }}>
        {
          octavesDictionary.map((pitch, pitchIndex) => (
            notes.filter(function(item, index) {
              if ((pitchIndex!==0 || item==='A' || item==='Bb' || item==='B') &&
              (fullPiano.indexOf(item+pitchIndex) > fullPiano.indexOf(state.lowerNoteAndPitch))) { return true }
              else { return false }
            }).map((note) => (
              <option key={note+pitchIndex} value={note+pitchIndex}>{notesDictionary[note][state.notesNaming]+pitch}</option>
            ))
          ))
        }
      </select>

      {/* Random notes buttons */}
      {
        state.riddle.length >= 3 && !state.answer ? // chord
          <div>
            {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { showAnswer() }} />
          </div>
        :
          state.riddle.length >= 1 && state.riddle.length < 3 && !state.answer ? // one or two separate notes
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='yellowbutton' type="button" value="Show answer" style={isVertical ? styles.noteButtonVertical : styles.noteButton} onClick={() => { showAnswer() }} />
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
              <div onClick={() => { props.setmidiNotePlaying(state.riddle) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                <span style={state.manualFinding ? styles.manuallyFoundStyle : styles.answerStyle}>
                  {notesDictionary[state.riddle[0].slice(0, -1)][state.notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                  &nbsp;🔁
                </span>
              </div>
              :
                state.riddle.length > 1 && state.riddle.length < 3 ?
                  <div onClick={() => { props.setmidiNotePlaying(state.riddle) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                    <span style={styles.clueStyle}>
                      {notesDictionary[state.riddle[0].slice(0, -1)][state.notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}
                    </span>
                    {' - '}
                    <span style={state.manualFinding ? styles.manuallyFoundStyle : styles.answerStyle}>
                      {notesDictionary[state.riddle[1].slice(0, -1)][state.notesNaming]+octavesDictionary[state.riddle[1][state.riddle[1].length-1]]}
                    </span>
                    &nbsp;🔁
                  </div>
                :
                  state.riddle.length >= 3 &&
                    <div onClick={() => { props.setmidiChordPlaying(state.riddle) }} style={isVertical ? styles.noteTextVertical : styles.noteText}>
                      <span style={state.manualChordFinding.indexOf(false) === -1 ? styles.manuallyFoundStyle : styles.answerStyle}>
                        {state.riddleName}&nbsp;🔁
                      </span>
                    </div>
          :
            state.riddle.length === 1 ?
              <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { props.setmidiNotePlaying(state.riddle) }}>
                ? 🔁
              </div>
              : state.riddle.length > 1 && state.riddle.length < 3 ?
                <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { props.setmidiNotePlaying(state.riddle) }}>
                  <span style={styles.clueStyle}>{notesDictionary[state.riddle[0].slice(0, -1)][state.notesNaming]+octavesDictionary[state.riddle[0][state.riddle[0].length-1]]}</span> - ? 🔁
                </div>
                :
                  state.riddle.length >= 3 &&
                    <div style={isVertical ? styles.noteTextVertical : styles.noteText} onClick={() => { props.setmidiChordPlaying(state.riddle) }}>
                      ? 🔁
                    </div>
        }
      </div>
    </div>
  )
}
