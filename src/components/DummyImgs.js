import React from "react";
import '../styles/styles.css';

export const DummyImgs = () => {
  const list = [
    'icons/info.png',
    'icons/quit.png',
    'icons/settings.png',
    'pitch0.png',
    'pitch1.png',
    'pitch2.png',
    'pitch3.png',
    'pitch4.png',
    'pitch5.png',
    'pitch6.png',
    'pitch7.png',
    'notes/black.png',
    'notes/black2.png',
    'notes/black3.png',
    'notes/black4.png',
    'notes/black5.png',
    'notes/black6.png',
    'notes/white.png',
    'notes/white2.png',
    'notes/white3.png',
    'notes/white4.png',
    'notes/white5.png',
    'notes/white6.png',
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
