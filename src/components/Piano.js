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
    setbaseOctavePosition(84/props.divisor);
    setoctavePositionDiff(7*48/props.divisor)
    setoctaves(
      [
        84/props.divisor-(7*48/props.divisor)*1,
        84/props.divisor+(7*48/props.divisor)*0,
        84/props.divisor+(7*48/props.divisor)*1,
        84/props.divisor+(7*48/props.divisor)*2,
        84/props.divisor+(7*48/props.divisor)*3,
        84/props.divisor+(7*48/props.divisor)*4,
        84/props.divisor+(7*48/props.divisor)*5,
        84/props.divisor+(7*48/props.divisor)*6,
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
            />
          </div>
        )
      })}
    </div>
  );
}
