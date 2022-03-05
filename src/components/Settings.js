import React, { useState, useEffect } from "react";
import {chordTypes} from '../const/chords';
import {styles} from '../styles/styles.js';
import '../styles/styles.css';

export const Settings = (props) => {
  const [state, setstate] = useState(props);

  useEffect(() => {
    setstate(props);

    for (let i=0; i<props.userChords.length; i++) {
      if (props.userChords[i]) {
        document.getElementById("userChords"+i).defaultChecked = true;
      }
      else {
        document.getElementById("userChords"+i).defaultChecked = false;
      }
    }

    if (localStorage.getItem("showRedAndGreenKeys") === 'false') {
      document.getElementById("colorKeys").defaultChecked = false;
      props.setshowRedAndGreenKeys(false);
    }
    else {
      document.getElementById("colorKeys").defaultChecked = true;
      props.setshowRedAndGreenKeys(true);
    }
  }, [props]);

  const handleChange = (e, key) => {
    const userChordsTemp = state.userChords;
    userChordsTemp[key] = e.target.checked;

    localStorage.setItem("userChords", userChordsTemp);
    props.setuserChords(userChordsTemp);
  };

  const handleColorKeysChange = (e) => {
    props.setshowRedAndGreenKeys(e.target.checked);
    localStorage.setItem("showRedAndGreenKeys", e.target.checked);
  };

  let isVertical: boolean = (state.windowWidth/state.windowHeight < 1);

  return (
    <div className='innerWindow infosAndSettings' style={{top: '6vh', height: 78-state.whiteHeight+'vh'}}>
      {/* Color keys Option */}
      <span style={styles.infoTitle}>
        Key colors:
      </span>
      <div>
        <label>
          <input type="checkbox" style={{transform: isVertical ? 'scale(1.5)' : 'scale(1)' }} className="checkbox" id="colorKeys" onClick={handleColorKeysChange} /> Color wrong keys in red and right keys in green (highly recommended for chord tests)
        </label>
      </div>

      <p/>

      {/* Chords */}
      <span style={styles.infoTitle}>
        Chords:
      </span>
      <div>
        {
          chordTypes.map((item, key) => (
            <label key={key+item}>
              {
                key <= 3 ?
                  <input
                    type="checkbox"
                    style={{transform: isVertical ? 'scale(1.5)' : 'scale(1)' }}
                    id={"userChords"+key}
                    checked
                    disabled
                    readOnly
                  />
                :
                  <input
                    type="checkbox"
                    style={{transform: isVertical ? 'scale(1.5)' : 'scale(1)' }}
                    id={"userChords"+key}
                    onClick={(e) => handleChange(e, key)}
                  />
              }
              &nbsp;{item.name} ({item.explanation})
              <br/>
            </label>
          ))
        }
      </div>
    </div>
  )
}
