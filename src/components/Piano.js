import React, { useState, useEffect } from "react";
import {Octave} from './Octave';
import '../styles/styles.css';

export const Piano = (props) => {
  const [state, setstate] = useState(props);
  const [whiteWidth, setwhiteWidth] = useState();
  const [baseOctavePosition, setbaseOctavePosition] = useState();
  const [octavePositionDiff, setoctavePositionDiff] = useState();
  const [baseBottomPosition] = useState(0);
  const [octaves, setoctaves] = useState([]);
  const [allPitches, setallPitches] = useState([]);

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

    const barHeight = 38/8;
    const barWidth = 337/props.divisor;

    const allPitchesProt = [];
    for (let i=0; i<=7; i++) {
      allPitchesProt.push(
        <img
          className="pitchimg"
          src={'/aurudition/img/pitch'+i+'.png'}
          alt={''}
          style={{
            width: barWidth+'vw',
            height: barHeight+'vh',
          }}
        />
      )
    }
    setallPitches(allPitchesProt);
  }, [props]);

  const pitches = {
    bottom: state.whiteHeight+baseBottomPosition,
  }

  return (
    <div>
      {octaves.map((key, index) => {
        return (
          <div key={'octave'+index}>
            <span style={{
              left: key+'vw',
              position: 'absolute',
              bottom: pitches.bottom+'vh',
            }}>
              {allPitches[index]}
            </span>

            <Octave
              id={index}
              instrument={state.instrument}
              divisor={state.divisor}

              whiteWidth={whiteWidth}
              whiteHeight={state.whiteHeight}
              baseOctavePosition={baseOctavePosition}
              octavePositionDiff={octavePositionDiff}
              baseBottomPosition={baseBottomPosition}
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
            />
          </div>
        )
      })}
    </div>
  );
}
