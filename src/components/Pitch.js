import React, { useState, useEffect } from "react";
import '../styles/styles.css';

export const Pitch = (props) => {
  const [state, setstate] = useState(props);
  const [barHeight] = useState(38/8);
  const [barWidth, setbarWidth] = useState(337/props.divisor);

  useEffect(() => {
    setstate(props);
    setbarWidth(336/props.divisor);
  }, [props]);

  const pitches = {
    bottom: state.whiteHeight,
  }

  return(
    <span style={{
      left: ((state.id*barWidth)-((barWidth/7)*5.25))+'vw',
      position: 'absolute',
      bottom: pitches.bottom+'vh',
    }}>
      <img
        className="pitchimg"
        src={'/aurudition/img/pitch'+state.id+'.png'}
        alt={''}
        style={{
          width: barWidth+'vw',
          height: barHeight+'vh',
        }}
      />
    </span>
  )
}
