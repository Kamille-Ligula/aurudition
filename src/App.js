import React, { useState, useEffect } from "react";
import {Piano} from './components/Piano';
import {playNote} from './lib/playNote';
import {instruments} from './const/instruments';
import {playRandomNote} from './lib/playRandomNote';
import {notes} from './const/notes';
import {wait} from './lib/wait';
import {noteButton, selectionButton, noteText, notesAndAnswers, noteButtonVertical, selectionButtonVertical, noteTextVertical} from './styles/styles.js';
import './styles/styles.css';

export default function App() {
  const [note, setnote] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrument") || 'acoustic_grand_piano-mp3');
  const [repeat, setrepeat] = useState(false);
  const [answer, setanswer] = useState(false);
  const [lowerNoteAndPitch, setlowerNoteAndPitch] = useState(localStorage.getItem("lowerNoteAndPitch") || 'A4');
  const [higherNoteAndPitch, sethigherNoteAndPitch] = useState(localStorage.getItem("higherNoteAndPitch") || 'F6');
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const [divisor, setdivisor] = useState(window.innerWidth/window.innerHeight*8);

  function handleWindowSizeChange() {
    setwindowWidth(window.innerWidth);
    setwindowHeight(window.innerHeight);
    setdivisor(window.innerWidth/window.innerHeight*8);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let isVertical: boolean = (windowWidth/windowHeight < 1);

  async function askForNotes(number) {
    const randomCombination = [];

    for (let i=0; i<number; i++) {
      randomCombination.push(playRandomNote(lowerNoteAndPitch, higherNoteAndPitch));
    }

    setanswer(false);

    setnote(randomCombination);
  }

  useEffect(() => {
    async function asyncFunction() {
      for (let i=0; i<note.length; i++){
        playNote(note[i], instrument);
        await wait(500);
      }
    }
    asyncFunction();
  }, [note, repeat, instrument]);

  function showAnswer() {
    setanswer(true);
  }

  function pickIntrument(which) {
    setinstrument(which);
    localStorage.setItem("instrument", which);
  }

  return (
    <div className='noselect'>
      <div className='getNoteButtons'>
        {/* Instrument and range */}
        <div>
          <select style={isVertical ? selectionButtonVertical : selectionButton} value={instrument} id="instrumentsList" onChange={(e) => { pickIntrument(e.target.value) }}>
            {
              instruments.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
          </select>
          <span>&nbsp;</span>
          <select style={isVertical ? selectionButtonVertical : selectionButton} value={lowerNoteAndPitch} id="notesList" onChange={(e) => { setlowerNoteAndPitch(e.target.value); localStorage.setItem("lowerNoteAndPitch", e.target.value); }}>
            {
              [0,1,2,3,4,5,6,7].map((pitch) => (
                notes.filter(function(item, index) {
                  if (pitch!==0 || note==='A' || note==='Bb' || note==='B') { return true }
                  else { return false }
                }).map((note) => (
                  <option key={note+pitch} value={note+pitch}>{note+pitch}</option>
                ))
              ))
            }
          </select>
          <span>&nbsp;</span>
          <select style={isVertical ? selectionButtonVertical : selectionButton} value={higherNoteAndPitch} id="notesList" onChange={(e) => { sethigherNoteAndPitch(e.target.value); localStorage.setItem("higherNoteAndPitch", e.target.value); }}>
            {
              [0,1,2,3,4,5,6,7].map((pitch) => (
                notes.filter(function(item, index) {
                  if (pitch!==0 || note==='A' || note==='Bb' || note==='B') { return true }
                  else { return false }
                }).map((note) => (
                  <option key={note+pitch} value={note+pitch}>{note+pitch}</option>
                ))
              ))
            }
          </select>
        </div>

        {/* Random notes buttons */}
        <div>
          {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random note" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(1) }} />
          {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play two random notes" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(2) }} />
        </div>

        {/* Notes and answers */}
        <div style={notesAndAnswers}>
          { answer ?
            <div style={isVertical ? noteTextVertical : noteText}>{note.map((key, index) => {
              if (index > 0) { return <span key={key+index}> - {key}</span> }
              else { return <span key={key}>{key}</span> }
            })}</div>
            : note.length === 1 ?
                <div style={isVertical ? noteTextVertical : noteText}>
                  ?
                </div>
              : (note.length > 1) &&
                <div style={isVertical ? noteTextVertical : noteText}>
                  {note[0]} - ?
                </div>
          }
          {
            note.length >= 1 && !answer &&
            <div>
              <input className='redbutton' type="button" value="Show answer" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { showAnswer() }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { setrepeat(!repeat) }} />
            </div>
          }
        </div>
      </div>

      <Piano
        instrument={instrument}
        divisor={divisor}
      />
    </div>
  );
}
