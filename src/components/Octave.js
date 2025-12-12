import React, { useState, useEffect } from "react";
import {Key} from './Key';
import '../styles/styles.css';

export const Octave = (props) => {
  const [state, setstate] = useState(props);
  const [blackHeight, setblackHeight] = useState(props.windowHeight/7);
  const [blackWidth, setblackWidth] = useState();
  const [notes, setnotes] = useState({});

  useEffect(() => {
    setstate(props);
    setblackWidth(28/props.divisor);
    setblackHeight(props.windowHeight/7);

    const notesProt = {};
    const naturalsList = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const accidentalsList = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
    const accidentalsMultipliersList = [1, 3, 6, 8, 10];

    for (let i=0; i<naturalsList.length; i++) {
      notesProt[naturalsList[i]] = {
        bottom: 0+props.keysOffsetBottom,
        offset: props.whiteWidth*i,
      }
    }
    for (let i=0; i<accidentalsList.length; i++) {
      notesProt[accidentalsList[i]] = {
        bottom: props.whiteHeight-blackHeight+props.keysOffsetBottom,
        offset: 28/props.divisor*accidentalsMultipliersList[i],
      }
    }
    setnotes(notesProt)
  }, [props, blackHeight]);

  return (
    <div>
      {Object.entries(notes).map((key, index) => {
        return (
          <Key
            key={index+state.id}
            name={key[0]}
            bottom={key[1].bottom}
            offset={key[1].offset}
            octaveID={state.id}
            instrument={state.instrument}
            divisor={state.divisor}

            whiteWidth={state.whiteWidth}
            whiteHeight={state.whiteHeight}
            blackWidth={blackWidth}
            blackHeight={blackHeight}

            baseOctavePosition={state.baseOctavePosition}
            octavePositionDiff={state.octavePositionDiff}

            octaves={state.octaves}

            answer={state.answer}
            riddle={state.riddle}
            showRedAndGreenKeys={state.showRedAndGreenKeys}
            lowerNoteAndPitch={state.lowerNoteAndPitch}
            higherNoteAndPitch={state.higherNoteAndPitch}

            setmanualFinding={(manualFinding) =>
              props.setmanualFinding(manualFinding)
            }
            setmanualChordFinding={(manualChordFinding) =>
              props.setmanualChordFinding(manualChordFinding)
            }
            setmidiNotePlaying={(midiNotePlaying) =>
              props.setmidiNotePlaying(midiNotePlaying)
            }
          />
        )
      })}
    </div>
  )
}
