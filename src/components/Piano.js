import React, { useState, useEffect } from "react";
import {Octave} from './Octave';
import {Pitch} from './Pitch';
import '../styles/styles.css';

export const Piano = (props) => {
  const [state, setstate] = useState(props);
  const [whiteWidth, setwhiteWidth] = useState();
  const [baseOctavePosition, setbaseOctavePosition] = useState();
  const [octavePositionDiff, setoctavePositionDiff] = useState();
  const [octaves, setoctaves] = useState([]);
  const [keysOffsetBottom] = useState(0.5);

  useEffect(() => {
    setstate(props);
    setwhiteWidth(48/props.divisor);

    const baseOctavePositionTemp = 84/props.divisor;
    const octavePositionDiffTemp = 7*48/props.divisor;
    setbaseOctavePosition(baseOctavePositionTemp);
    setoctavePositionDiff(octavePositionDiffTemp)

    const octavesMultiplier = [];
      octavesMultiplier[0] = -1;
      octavesMultiplier[1] = 0;
      octavesMultiplier[2] = 1;
      octavesMultiplier[3] = 2;
      octavesMultiplier[4] = 3;
      octavesMultiplier[5] = 4;
      octavesMultiplier[6] = 5;
      octavesMultiplier[7] = 6;

    const octavesTemp = [
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[0],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[1],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[2],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[3],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[4],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[5],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[6],
      baseOctavePositionTemp+octavePositionDiffTemp*octavesMultiplier[7],
    ];

    setoctaves(octavesTemp);
  }, [props]);

  return (
    <div>
      {octaves.map((key, index) => {
        return (
          <div key={'octave'+index}>
            <Pitch
              id={index}
              key={key}
              divisor={state.divisor}
              whiteHeight={state.whiteHeight}
              windowHeight={state.windowHeight}
              keysOffsetBottom={keysOffsetBottom}
            />

            <Octave
              id={index}
              instrument={state.instrument}
              divisor={state.divisor}
              keysOffsetBottom={keysOffsetBottom}

              whiteWidth={whiteWidth}
              whiteHeight={state.whiteHeight}
              windowHeight={state.windowHeight}
              baseOctavePosition={baseOctavePosition}
              octavePositionDiff={octavePositionDiff}
              octaves={octaves}
              showRedAndGreenKeys={state.showRedAndGreenKeys}
              lowerNoteAndPitch={state.lowerNoteAndPitch}
              higherNoteAndPitch={state.higherNoteAndPitch}

              answer={state.answer}
              riddle={state.riddle}

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
          </div>
        )
      })}
    </div>
  );
}
