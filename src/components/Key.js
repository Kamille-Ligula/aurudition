import React, { useState, useEffect, useRef } from "react";
import {playNote} from '../lib/playNote';
import {IndividualKey} from '../lib/IndividualKey';
import '../styles/styles.css';

export const Key = (props) => {
  const [state, setstate] = useState(props);
  const [color, setcolor] = useState('base');

  const prevriddleRef = useRef();
  useEffect(() => {
    //assign the ref's current value to the count Hook
    prevriddleRef.current = props.riddle;
    if (props.riddle !== prevriddleRef) {
      setcolor('base')
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
        if (state.showRedAndGreenKeys) {
          if (state.name+state.octaveID === state.riddle[state.riddle.length-1]) {
            setcolor('green');
            props.manualFinding(true);
          }
          else if (!state.answer) {
            setcolor('red')
          }
        }
      }}
    >
      {
        state.riddle.length >= 1 && color === 'green' ?
          (state.name+state.octaveID).length > 2 ?
            IndividualKey('black2', state.blackWidth, state.blackHeight)
          :
            IndividualKey('white2', state.whiteWidth, state.whiteHeight)
        :
          state.answer && state.riddle[state.riddle.length-1] === state.name+state.octaveID ?
            (state.name+state.octaveID).length > 2 ?
              IndividualKey('black4', state.blackWidth, state.blackHeight)
            :
              IndividualKey('white4', state.whiteWidth, state.whiteHeight)
          :
            state.riddle.length > 1 && state.riddle[0] === state.name+state.octaveID ?
              (state.name+state.octaveID).length > 2 ?
                IndividualKey('black5', state.blackWidth, state.blackHeight)
              :
                IndividualKey('white5', state.whiteWidth, state.whiteHeight)
            :
              state.riddle.length >= 1 && color === 'red' ?
                (state.name+state.octaveID).length > 2 ?
                  IndividualKey('black3', state.blackWidth, state.blackHeight)
                :
                  IndividualKey('white3', state.whiteWidth, state.whiteHeight)
              :
                (state.name+state.octaveID).length > 2 ?
                  IndividualKey('black', state.blackWidth, state.blackHeight)
                :
                  IndividualKey('white', state.whiteWidth, state.whiteHeight)
      }
    </span>
  )
}
