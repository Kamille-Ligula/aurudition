import React, { useState, useEffect } from "react";
import {Note} from './Note';
import '../styles/styles.css';

export const Octave = (props) => {
  const [state, setstate] = useState(props);
  const [blackHeight] = useState(118/8);
  const [blackWidth, setblackWidth] = useState();
  const [notes, setnotes] = useState({});

  useEffect(() => {
    setstate(props);
    setblackWidth(28/props.divisor)

    const naturals = {
      position: 'absolute',
      bottom: props.baseBottomPosition,
    }

    const accidentals = {
      position: 'absolute',
      bottom: props.whiteHeight-blackHeight+props.baseBottomPosition,
    }

    const notesProt = {};
    const naturalsList = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const accidentalsList = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
    const accidentalsNumbersList = [1, 3, 6, 8, 10];
    for (let i=0; i<naturalsList.length; i++) {
      notesProt[naturalsList[i]] = {
        classification: naturals,
        position: props.whiteWidth*i,
        width: props.whiteWidth,
        height: props.whiteHeight,
      }
    }
    for (let i=0; i<accidentalsList.length; i++) {
      notesProt[accidentalsList[i]] = {
        classification: accidentals,
        position: 28/props.divisor*accidentalsNumbersList[i],
        width: 28/props.divisor,
        height: blackHeight,
      }
    }
    setnotes(notesProt)
  }, [props, blackHeight]);

  return (
    <div>
      {Object.entries(notes).map((key, index) => {
        return (
          <Note
            key={index+state.id}
            name={key[0]}
            classification={key[1].classification}
            position={key[1].position}
            octaveID={state.id}
            instrument={state.instrument}
            divisor={state.divisor}

            whiteWidth={state.whiteWidth}
            whiteHeight={state.whiteHeight}
            baseOctavePosition={state.baseOctavePosition}
            octavePositionDiff={state.octavePositionDiff}
            baseBottomPosition={state.baseBottomPosition}
            octaves={state.octaves}
            blackWidth={blackWidth}
            blackHeight={blackHeight}
          />
        )
      })}
    </div>
  )
}
