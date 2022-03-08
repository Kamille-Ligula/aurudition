import React from "react";
import '../styles/styles.css';

export const DummyImgs = () => {
  const list = [
    'icons/info.png',
    'icons/quit.png',
    'icons/settings.png',
  ]

  return (
    <div>
      { list.map((key, index) => (
          <img
            className='dummyImgs'
            alt='dummy'
            key={key+'dummy'}
            src={'/aurudition/img/'+key}
          />
        ))
      }
    </div>
  )
}
