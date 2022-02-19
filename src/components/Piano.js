import React, { useState, useEffect } from "react";
import {Octave} from './Octave';
import '../styles/styles.css';

export const Piano = (props) => {
  const [state, setstate] = useState(props);
  const [whiteWidth, setwhiteWidth] = useState();
  const [whiteHeight] = useState(202/8);
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

    setoctaves(
      [
        baseOctavePositionTemp-octavePositionDiffTemp*1,
        baseOctavePositionTemp+octavePositionDiffTemp*0,
        baseOctavePositionTemp+octavePositionDiffTemp*1,
        baseOctavePositionTemp+octavePositionDiffTemp*2,
        baseOctavePositionTemp+octavePositionDiffTemp*3,
        baseOctavePositionTemp+octavePositionDiffTemp*4,
        baseOctavePositionTemp+octavePositionDiffTemp*5,
        baseOctavePositionTemp+octavePositionDiffTemp*6,
      ]
    )

    const barHeight = 38/8;

    const allPitchesProt = [];
    for (let i=0; i<=7; i++) {
      allPitchesProt.push(
        <img
            className="pitchimg"
            src={'/aurudition/img/pitch'+i+'.png'}
            alt={''}
            style={{
              width: 337/props.divisor+'vw',
              height: barHeight+'vh',
            }}
          />
      )
    }
    setallPitches(allPitchesProt);
  }, [props]);

  const pitches = {
    position: 'absolute',
    bottom: whiteHeight+baseBottomPosition,
  }

  return (
    <div>
      {octaves.map((key, index) => {
        return (
          <div key={'octave'+index}>
            <span style={{
              left: key+'vw',
              position: pitches.position,
              bottom: pitches.bottom+'vh',
            }}>{allPitches[index]}</span>
            <Octave
              id={index}
              instrument={state.instrument}
              divisor={state.divisor}

              whiteWidth={whiteWidth}
              whiteHeight={whiteHeight}
              baseOctavePosition={baseOctavePosition}
              octavePositionDiff={octavePositionDiff}
              baseBottomPosition={baseBottomPosition}
              octaves={octaves}

              answer={state.answer}
              note={state.note}
            />
          </div>
        )
      })}
    </div>
  );
}
