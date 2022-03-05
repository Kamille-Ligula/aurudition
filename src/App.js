import React, { useState, useEffect } from "react";
import {Piano} from './components/Piano';
import {Controls} from './components/Controls';
import {Infos} from './components/Infos';
import {Settings} from './components/Settings';
import {DummyImgs} from './components/DummyImgs';
import {chordTypes} from './const/chords';
import {loadNotes} from './lib/loadNotes';
import {fullPiano} from './const/notes';
import {styles} from './styles/styles.js';

export default function App() {
  const [riddle, setriddle] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrument") || 'acoustic_grand_piano-mp3');
  const [answer, setanswer] = useState(false);
  const [lowerNoteAndPitch, setlowerNoteAndPitch] = useState(localStorage.getItem("lowerNoteAndPitch") || 'C3');
  const [higherNoteAndPitch, sethigherNoteAndPitch] = useState(localStorage.getItem("higherNoteAndPitch") || 'C4');
  const [divisor, setdivisor] = useState(window.innerWidth/window.innerHeight*8);
  const [manualFinding, setmanualFinding] = useState(false);
  const [manualChordFinding, setmanualChordFinding] = useState([false, false, false, false]);
  const [showRedAndGreenKeys, setshowRedAndGreenKeys] = useState(true);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const [infos, setinfos] = useState(false);
  const [settings, setsettings] = useState(false);
  const [whiteHeight] = useState(202/8);
  const [userChords, setuserChords] = useState([]);
  const [riddleName, setriddleName] = useState('');

  useEffect(() => {
    setanswer(manualFinding);
  }, [manualFinding]);

  useEffect(() => {
    if (manualChordFinding.indexOf(false) === -1) {
      setanswer(true);
    }
  }, [manualChordFinding]);

  useEffect(() => {
    loadNotes(fullPiano, instrument);
  }, [instrument]);

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

  let isVertical: boolean = (windowWidth/windowHeight < 1);
  let isMobile: boolean = (windowWidth <= 1000);

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
                height: isMobile ? isVertical? '5vh' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? '1vh' : '1vw' : '0.5vw',
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
                height: isMobile ? isVertical? '5vh' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? '6vh' : '6vw' : '3.5vw',
              }}
              onClick={() => setinfos(true) }
            />
            <img
              alt='settings'
              src='/aurudition/img/icons/settings.png'
              style={{
                ...styles.topRightButtons,
                height: isMobile ? isVertical? '5vh' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? '1vh' : '1vw' : '0.5vw',
              }}
              onClick={() => setsettings(true) }
            />

            <Controls
              whiteHeight={whiteHeight}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
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
              riddleName={riddleName}
              setriddleName={(riddleName) => setriddleName(riddleName) }
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
          manualChordFindingTemp[callback] = true;
          setmanualChordFinding(manualChordFindingTemp);
        }}
      />

      <DummyImgs />
    </div>
  );
}
