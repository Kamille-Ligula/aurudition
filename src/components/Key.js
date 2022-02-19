import React, { useState, useEffect } from "react";
import {playNote} from '../lib/playNote';
import {IndividualKey} from '../lib/IndividualKey';
import '../styles/styles.css';

export const Key = (props) => {
  const [state, setstate] = useState(props);

  useEffect(() => {
    setstate(props);
  }, [props]);

  return (
    <span
      style={{
        left: state.octaves[state.octaveID]+state.position+'vw',
        position: state.classification.position,
        bottom: state.classification.bottom+'vh',
      }}
      onClick={() => playNote(state.name+state.octaveID, state.instrument)}
    >
      {
        state.answer && state.riddle[state.riddle.length-1] === state.name+state.octaveID ?
          (state.name+state.octaveID).length > 2 ?
            IndividualKey('black4', state.blackWidth, state.blackHeight)
          :
            IndividualKey('white4', state.whiteWidth, state.whiteHeight)
        :
          (state.name+state.octaveID).length > 2 ?
            IndividualKey('black', state.blackWidth, state.blackHeight)
          :
            IndividualKey('white', state.whiteWidth, state.whiteHeight)
      }
    </span>
  )
}
