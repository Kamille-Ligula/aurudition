import React, { useState, useEffect } from "react";
import {Piano} from './components/Piano';
import {playNote} from './lib/playNote';
import {instruments} from './const/instruments';
import {playRandomNote} from './lib/playRandomNote';
import {notes, notesDictionary, octavesDictionary} from './const/notes';
import {wait} from './lib/wait';
import {noteButton, selectionButton, noteText, notesAndAnswers, noteButtonVertical, selectionButtonVertical, noteTextVertical} from './styles/styles.js';
import './styles/styles.css';

export default function App() {
  const [riddle, setriddle] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrument") || 'acoustic_grand_piano-mp3');
  const [repeat, setrepeat] = useState(false);
  const [answer, setanswer] = useState(false);
  const [lowerNoteAndPitch, setlowerNoteAndPitch] = useState(localStorage.getItem("lowerNoteAndPitch") || 'C5');
  const [higherNoteAndPitch, sethigherNoteAndPitch] = useState(localStorage.getItem("higherNoteAndPitch") || 'C6');
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const [divisor, setdivisor] = useState(window.innerWidth/window.innerHeight*8);
  const [notesNaming, setnotesNaming] = useState(localStorage.getItem("notesNaming") || 0);

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

    setriddle(randomCombination);
  }

  useEffect(() => {
    async function asyncFunction() {
      for (let i=0; i<riddle.length; i++){
        playNote(riddle[i], instrument);
        await wait(500);
      }
    }
    asyncFunction();
  }, [riddle, repeat, instrument]);

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
        <select style={isVertical ? selectionButtonVertical : selectionButton} value={notesNaming} id="conventionsList" onChange={(e) => { setnotesNaming(e.target.value); localStorage.setItem("notesNaming", e.target.value); }}>
          {
            ['English notation', 'German notation', 'Italian notation'].map((convention, conventionIndex) => (
              <option key={convention+conventionIndex} value={conventionIndex}>{convention}</option>
            ))
          }
        </select>

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
              octavesDictionary.map((pitch, pitchIndex) => (
                notes.filter(function(item, index) {
                  if (pitchIndex!==0 || riddle==='A' || riddle==='Bb' || riddle==='B') { return true }
                  else { return false }
                }).map((note) => (
                  <option key={note+pitchIndex} value={note+pitchIndex}>{notesDictionary[note][notesNaming]+pitch}</option>
                ))
              ))
            }
          </select>
          <span>&nbsp;</span>
          <select style={isVertical ? selectionButtonVertical : selectionButton} value={higherNoteAndPitch} id="notesList" onChange={(e) => { sethigherNoteAndPitch(e.target.value); localStorage.setItem("higherNoteAndPitch", e.target.value); }}>
            {
              octavesDictionary.map((pitch, pitchIndex) => (
                notes.filter(function(item, index) {
                  if (pitchIndex!==0 || riddle==='A' || riddle==='Bb' || riddle==='B') { return true }
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
          riddle.length >= 1 && !answer ?
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='redbutton' type="button" value="Show answer" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { showAnswer() }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Repeat" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { setrepeat(!repeat) }} />
            </div>
          :
            <div>
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play a random note" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(1) }} />
              {isVertical ? <p/> : <span>&nbsp;</span>}<input className='button' type="button" value="Play two random notes" style={isVertical ? noteButtonVertical : noteButton} onClick={() => { askForNotes(2) }} />
            </div>
        }

        {/* Notes and answers */}
        <div style={notesAndAnswers}>
          {
            answer ?
              <div style={isVertical ? noteTextVertical : noteText}>{riddle.map((key, index) => {
                if (index > 0) { return <span key={key+index}> - {notesDictionary[key.slice(0, -1)][notesNaming]+octavesDictionary[key[key.length-1]]}</span> }
                else { return <span key={key}>{notesDictionary[key.slice(0, -1)][notesNaming]+octavesDictionary[key[key.length-1]]}</span> }
              })}</div>
              : riddle.length === 1 ?
                <div style={isVertical ? noteTextVertical : noteText}>
                  ?
                </div>
                : (riddle.length > 1) &&
                  <div style={isVertical ? noteTextVertical : noteText}>
                    {notesDictionary[riddle[0].slice(0, -1)][notesNaming]+octavesDictionary[riddle[0][riddle[0].length-1]]} - ?
                  </div>
          }
        </div>
      </div>

      <Piano
        instrument={instrument}
        divisor={divisor}
        answer={answer}
        riddle={riddle}
      />
    </div>
  );
}
