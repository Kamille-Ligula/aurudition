import React, { useState, useEffect } from "react";
import {Piano} from './components/Piano';
import {Controls} from './components/Controls';
import {Infos} from './components/Infos';
import {Settings} from './components/Settings';
import {DummyImgs} from './components/DummyImgs';
import {chordTypes} from './const/chords';

export default function App() {
  const [riddle, setriddle] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrument") || 'acoustic_grand_piano-mp3');
  const [answer, setanswer] = useState(false);
  const [lowerNoteAndPitch, setlowerNoteAndPitch] = useState(localStorage.getItem("lowerNoteAndPitch") || 'C3');
  const [higherNoteAndPitch, sethigherNoteAndPitch] = useState(localStorage.getItem("higherNoteAndPitch") || 'C4');
  const [divisor, setdivisor] = useState(window.innerWidth/window.innerHeight*8);
  const [manualFinding, setmanualFinding] = useState(false);
  const [manualChordFinding, setmanualChordFinding] = useState([false, false, false]);
  const [showRedAndGreenKeys, setshowRedAndGreenKeys] = useState(true);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const [infos, setinfos] = useState(false);
  const [settings, setsettings] = useState(false);
  const [whiteHeight] = useState(202/8);
  const [userChords, setuserChords] = useState([]);

  useEffect(() => {
    setanswer(manualFinding);
  }, [manualFinding]);

  useEffect(() => {
    if (manualChordFinding.indexOf(false) === -1) {
      setanswer(true);
    }
  }, [manualChordFinding]);

  useEffect(() => {
    let userChordsTemp;

    if (localStorage.getItem("userChords")) {
      userChordsTemp = (localStorage.getItem("userChords").split(' '))[0].split(',')

      for (let i=0; i<userChordsTemp.length; i++) {
        if (userChordsTemp[i] === 'true') { userChordsTemp[i] = true; }
        else { userChordsTemp[i] = false; }
      }
    }
    else {
      userChordsTemp = Array(chordTypes.length).fill(false);
      for (let i=0; i<4; i++) {
        userChordsTemp[i] = true;
      }
    }

    setuserChords(userChordsTemp);
  }, []);

  function handleWindowSizeChange() {
    setwindowWidth(window.innerWidth);
    setwindowHeight(window.innerHeight);
    setdivisor(window.innerWidth/window.innerHeight*8);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const styles = {
    topRightButtons: {
      zIndex: '999',
      elevation: '999',
      position: 'fixed',
      top: '1vh',
      height: '6vh',
      width: 'auto',
    },
    settingsButton: {
      right: '1vh',
    },
    quitButton: {
      right: '1vh',
    },
    infoButton: {
      right: '7vh',
    },
  }

  return (
    <div className='noselect'>
      {
        settings || infos ?
          <div>
            <img
              alt='quit'
              src='/aurudition/img/icons/quit.png'
              style={{
                ...styles.topRightButtons,
                ...styles.quitButton
              }}
              onClick={() => { setinfos(false); setsettings(false); }}
            />
            {
              settings ?
                <Settings
                  whiteHeight={whiteHeight}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  userChords={userChords}
                  setuserChords={(userChords) => setuserChords(userChords) }
                  showRedAndGreenKeys={showRedAndGreenKeys}
                  setshowRedAndGreenKeys={(showRedAndGreenKeys) => setshowRedAndGreenKeys(showRedAndGreenKeys) }
                />
              :
                infos ?
                  <Infos
                    whiteHeight={whiteHeight}
                    windowHeight={windowHeight}
                  />
                :
                  <div></div>
            }
          </div>
        :
          <div>
            <img
              alt='info'
              src='/aurudition/img/icons/info.png'
              style={{
                ...styles.topRightButtons,
                ...styles.infoButton
              }}
              onClick={() => setinfos(true) }
            />
            <img
              alt='settings'
              src='/aurudition/img/icons/settings.png'
              style={{
                ...styles.topRightButtons,
                ...styles.settingsButton
              }}
              onClick={() => setsettings(true) }
            />

            <Controls
              whiteHeight={whiteHeight}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              divisor={divisor}
              instrument={instrument}
              setinstrument={(instrument) => setinstrument(instrument) }
              lowerNoteAndPitch={lowerNoteAndPitch}
              setlowerNoteAndPitch={(lowerNoteAndPitch) => setlowerNoteAndPitch(lowerNoteAndPitch) }
              higherNoteAndPitch={higherNoteAndPitch}
              sethigherNoteAndPitch={(higherNoteAndPitch) => sethigherNoteAndPitch(higherNoteAndPitch) }
              answer={answer}
              setanswer={(answer) => setanswer(answer) }
              manualFinding={manualFinding}
              setmanualFinding={(manualFinding) => setmanualFinding(manualFinding) }
              manualChordFinding={manualChordFinding}
              setmanualChordFinding={(manualChordFinding) => { setmanualChordFinding(manualChordFinding) }}
              riddle={riddle}
              setriddle={(riddle) => setriddle(riddle) }
              userChords={userChords}
            />
          </div>
      }

      <Piano
        instrument={instrument}
        divisor={divisor}
        answer={answer}
        riddle={riddle}
        showRedAndGreenKeys={showRedAndGreenKeys}
        lowerNoteAndPitch={lowerNoteAndPitch}
        higherNoteAndPitch={higherNoteAndPitch}
        whiteHeight={whiteHeight}
        setmanualFinding={(manualFinding) => setmanualFinding(manualFinding) }
        setmanualChordFinding={(callback) => {
          const manualChordFindingTemp = [...manualChordFinding];
          manualChordFindingTemp[callback.indexOf(true)] = true;
          setmanualChordFinding(manualChordFindingTemp);
        }}
      />

      <DummyImgs />
    </div>
  );
}
