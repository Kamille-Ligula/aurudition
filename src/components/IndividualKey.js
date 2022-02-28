import React from "react";

export function IndividualKey(which, width, height) {
  return (
    <img
      className="noteimg"
      src={'/aurudition/img/notes/'+which+'.png'}
      alt={''}
      style={{
        width: width+'vw',
        height: height+'vh'
      }}
    />
  )
}
