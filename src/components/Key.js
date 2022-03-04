import React, { useState, useEffect, useRef } from "react";
import {playNote} from '../lib/playNote';
import {IndividualKey} from './IndividualKey';
import '../styles/styles.css';
import {fullPiano} from '../const/notes';

export const Key = (props) => {
  const [state, setstate] = useState(props);
  const [color, setcolor] = useState('base');

  const prevriddleRef = useRef();
  useEffect(() => {
    //assign the ref's current value to the count Hook
    prevriddleRef.current = props.riddle;
    if (props.riddle !== prevriddleRef) {
      setcolor('base') // reset colors
    }
  }, [props.riddle]); //run this code when the value of count changes

  useEffect(() => {
    setstate(props);
  }, [props]);

  return (
    <span
      style={{
        left: state.octaves[state.octaveID]+state.offset+'vw',
        position: 'absolute',
        bottom: state.bottom+'vh',
      }}
      onClick={() => {
        playNote([state.name+state.octaveID], state.instrument);
        if (state.showRedAndGreenKeys && !state.answer) {
          if (state.riddle.length < 3) {
            if (state.name+state.octaveID === state.riddle[state.riddle.length-1]) {
              setcolor('green');
              props.setmanualFinding(true);
            }
            else if (!state.answer) {
              setcolor('red')
            }
          }
          else {
            if (state.name+state.octaveID === state.riddle[0]) {
              setcolor('green');
              props.setmanualChordFinding([true, false, false]);
            }
            else if (state.name+state.octaveID === state.riddle[1]) {
              setcolor('green')
              props.setmanualChordFinding([false, true, false]);
            }
            else if (state.name+state.octaveID === state.riddle[2]) {
              setcolor('green')
              props.setmanualChordFinding([false, false, true]);
            }
            else if (!state.answer) {
              setcolor('red')
            }
          }
        }
      }}
    >
      {
        (fullPiano.indexOf(state.name+state.octaveID) >= fullPiano.indexOf(state.lowerNoteAndPitch)) &&
        (fullPiano.indexOf(state.name+state.octaveID) <= fullPiano.indexOf(state.higherNoteAndPitch)) ? // normal colors
          state.riddle.length >= 1 && color === 'green' ? // green
            (state.name+state.octaveID).length > 2 ?
              IndividualKey('black2', state.blackWidth, state.blackHeight)
            :
              IndividualKey('white2', state.whiteWidth, state.whiteHeight)
          :
            (state.answer && state.riddle[state.riddle.length-1] === state.name+state.octaveID) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[0]) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[1]) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[2]) ? // yellow
              (state.name+state.octaveID).length > 2 ?
                IndividualKey('black4', state.blackWidth, state.blackHeight)
              :
                IndividualKey('white4', state.whiteWidth, state.whiteHeight)
            :
              state.riddle.length === 2 && state.riddle[0] === state.name+state.octaveID ? // blue
                (state.name+state.octaveID).length > 2 ?
                  IndividualKey('black5', state.blackWidth, state.blackHeight)
                :
                  IndividualKey('white5', state.whiteWidth, state.whiteHeight)
              :
                state.riddle.length >= 1 && color === 'red' ? // red
                  (state.name+state.octaveID).length > 2 ?
                    IndividualKey('black3', state.blackWidth, state.blackHeight)
                  :
                    IndividualKey('white3', state.whiteWidth, state.whiteHeight)
                :
                  (state.name+state.octaveID).length > 2 ? // base
                    IndividualKey('black', state.blackWidth, state.blackHeight)
                  :
                    IndividualKey('white', state.whiteWidth, state.whiteHeight)
        :
          <div>
            {
              (state.name+state.octaveID).length > 2 ? // grey
                IndividualKey('black6', state.blackWidth, state.blackHeight)
              :
                IndividualKey('white6', state.whiteWidth, state.whiteHeight)
            }
          </div>
      }
    </span>
  )
}
