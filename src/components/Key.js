import React, { useState, useEffect, useRef } from "react";
import {KeyIMG} from './KeyIMG';
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
        bottom: state.bottom+'px',
      }}
      onClick={() => {
        props.setmidiNotePlaying([state.name+state.octaveID]);
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
            const temp = Array(state.riddle.length).fill(false);
            for (let i=0; i<state.riddle.length; i++) {
              if (state.name+state.octaveID === state.riddle[i]) {
                setcolor('green');
                temp[i] = true;
                props.setmanualChordFinding(i);
              }
            }
            if (!state.answer && temp.indexOf(true) === -1) {
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
              KeyIMG('#12832f', state.blackWidth, state.blackHeight)
            :
              KeyIMG('#3ae465', state.whiteWidth, state.whiteHeight)
          :
            (state.answer && state.riddle[state.riddle.length-1] === state.name+state.octaveID) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[0]) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[1]) ||
            (state.answer && state.riddle.length >= 3 && state.name+state.octaveID === state.riddle[2]) ? // yellow
              (state.name+state.octaveID).length > 2 ?
                KeyIMG('#888500', state.blackWidth, state.blackHeight)
              :
                KeyIMG('#fffc6a', state.whiteWidth, state.whiteHeight)
            :
              state.riddle.length === 2 && state.riddle[0] === state.name+state.octaveID ? // blue
                (state.name+state.octaveID).length > 2 ?
                  KeyIMG('#222482', state.blackWidth, state.blackHeight)
                :
                  KeyIMG('#454ace', state.whiteWidth, state.whiteHeight)
              :
                state.riddle.length >= 1 && color === 'red' ? // red
                  (state.name+state.octaveID).length > 2 ?
                    KeyIMG('#950000', state.blackWidth, state.blackHeight)
                  :
                    KeyIMG('#ff3c3c', state.whiteWidth, state.whiteHeight)
                :
                  (state.name+state.octaveID).length > 2 ? // base
                    KeyIMG('#000000', state.blackWidth, state.blackHeight)
                  :
                    KeyIMG('#ffffff', state.whiteWidth, state.whiteHeight)
        :
          <span>
            {
              (state.name+state.octaveID).length > 2 ? // grey
                KeyIMG('#3E3E3E', state.blackWidth, state.blackHeight)
              :
                KeyIMG('#c3c3c3', state.whiteWidth, state.whiteHeight)
            }
          </span>
      }
    </span>
  )
}
