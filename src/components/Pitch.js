import React, { useState, useEffect } from "react";
import '../styles/styles.css';

export const Pitch = (props) => {
  const [state, setstate] = useState(props);
  const [barHeight] = useState(38/8);
  const [barWidth, setbarWidth] = useState(337/props.divisor);

  const borderWidth = 0.1;

  useEffect(() => {
    setstate(props);
    setbarWidth(336/props.divisor);
  }, [props]);

  const pitches = {
    bottom: state.whiteHeight+state.keysOffsetBottom,
  }

  return (
    <span
      className="pitchimg"
      alt={''}
      style={{
        backgroundColor: '#ffffff',
        width: (barWidth-borderWidth*2)+'vw',
        height: barHeight+'vh',
        borderStyle: 'solid',
        borderWidth: borderWidth+'vw',
        borderColor: '#000000',

        left: ((state.id*barWidth)-((barWidth/7)*5.25))+'vw',
        position: 'absolute',
        bottom: pitches.bottom+'vh',

        textAlign: 'center',
        fontSize: (barHeight-borderWidth*2)+'vh',
      }}
    >
      {state.id}
    </span>
  )
}
