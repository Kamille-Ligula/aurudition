import React, { useState, useEffect } from "react";
import '../styles/styles.css';

export const Pitch = (props) => {
  const [state, setstate] = useState(props);
  const [barHeight, setbarHeight] = useState(props.windowHeight/20);
  const [barWidth, setbarWidth] = useState(337/props.divisor);

  const borderWidth = 0.1;

  useEffect(() => {
    setstate(props);
    setbarWidth(336/props.divisor);
    setbarHeight(props.windowHeight/20);
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
        height: barHeight+'px',
        borderStyle: 'solid',
        borderWidth: borderWidth+'vw',
        borderColor: '#000000',

        left: ((state.id*barWidth)-((barWidth/7)*5.25))+'vw',
        position: 'absolute',
        bottom: pitches.bottom+'px',

        textAlign: 'center',
        fontSize: (barHeight-borderWidth*2)+'px',
      }}
    >
      {state.id}
    </span>
  )
}
