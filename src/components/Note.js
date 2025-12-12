import React, { useState, useEffect } from "react";
import {playNote} from '../lib/playNote';
import '../styles/styles.css';

export const Note = (props) => {
  const [state, setstate] = useState(props);

  useEffect(() => {
    setstate(props);
  }, [props]);

  const whiteKey = <img
          className="noteimg"
          src={'/aurudition/img/notes/white.png'}
          alt={''}
          style={{
            width: state.whiteWidth+'vw',
            height: state.whiteHeight+'vh'
          }}
        />,
        blackKey = <img
          className="noteimg"
          src={'/aurudition/img/notes/black.png'}
          alt={''}
          style={{
            width: state.blackWidth+'vw',
            height: state.blackHeight+'vh',
          }}
        />;

  const allNotes = {
    A: whiteKey,
    B: whiteKey,
    C: whiteKey,
    D: whiteKey,
    E: whiteKey,
    F: whiteKey,
    G: whiteKey,
    Ab: blackKey,
    Bb: blackKey,
    Db: blackKey,
    Eb: blackKey,
    Gb: blackKey,
  };

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
        state.answer && state.note[state.note.length-1] === state.name+state.octaveID ?
          state.note[state.note.length-1].length > 2 ?
            <img
              className="noteimg"
              src={'/aurudition/img/notes/black4.png'}
              alt={''}
              style={{
                width: state.blackWidth+'vw',
                height: state.blackHeight+'vh',
              }}
            />
          :
            <img
              className="noteimg"
              src={'/aurudition/img/notes/white4.png'}
              alt={''}
              style={{
                width: state.whiteWidth+'vw',
                height: state.whiteHeight+'vh'
              }}
            />
        : allNotes[state.name]
      }
    </span>
  )
}
