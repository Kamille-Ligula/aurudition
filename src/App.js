import React, { useState, useEffect } from "react";
import MIDISounds from 'midi-sounds-react';
import {Piano} from './components/Piano';
import {Controls} from './components/Controls';
import {Infos} from './components/Infos';
import {Settings} from './components/Settings';
import {DummyImgs} from './components/DummyImgs';
import {chordTypes} from './const/chords';
import {fullPiano} from './const/notes';
import {wait} from './lib/wait';
import {styles} from './styles/styles.js';

export default function App() {
  const [riddle, setriddle] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrumentID") || 3);
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
  const [whiteHeight, setwhiteHeight] = useState(window.innerHeight/4);
  const [userChords, setuserChords] = useState([]);
  const [riddleName, setriddleName] = useState('');
  const [instrumentsItemsList, setinstrumentsItemsList] = useState([]);
  const [notesNaming, setnotesNaming] = useState(localStorage.getItem("notesNaming") || 0);

  async function playNote(which, instrument) {
    for (let i=0; i<which.length; i++) {
      MIDISounds.midiSounds.playChordAt(0, instrument, [21+fullPiano.indexOf(which[i])], 1.5);
      await wait(1000*0.6);
    }
  }

  async function playChord(which, instrument) {
    for (let i=0; i<which.length; i++) {
      MIDISounds.midiSounds.playChordAt(0, instrument, [21+fullPiano.indexOf(which[i])], 1.5);
    }
  }

  useEffect(() => {
    MIDISounds.midiSounds.cacheInstrument(instrument);
  }, [instrument]);

  useEffect(() => {
    const items = [...instrumentsItemsList];
    if (MIDISounds.midiSounds) {
      if (items.length === 0) {
        for (let i=0; i<MIDISounds.midiSounds.player.loader.instrumentKeys().length; i++) {
          const instrumentTitle = MIDISounds.midiSounds.player.loader.instrumentInfo(i).title;
          items.push(
            <option key={i} value={i} >
              {'' + i + '. ' + instrumentTitle.substring(0, instrumentTitle.indexOf(':'))}
            </option>
          );
        }
        setinstrumentsItemsList(items);
      }
    }
  }, [instrumentsItemsList]);

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

    if (localStorage.getItem("showRedAndGreenKeys") === 'true') {
      setshowRedAndGreenKeys(true);
    }
    else {
      setshowRedAndGreenKeys(false);
    }

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  function handleWindowSizeChange() {
    setwindowWidth(window.innerWidth);
    setwindowHeight(window.innerHeight);
    setdivisor(window.innerWidth/window.innerHeight*8);
    setwhiteHeight(window.innerHeight/4);
  }

  let isVertical: boolean = (windowWidth/windowHeight < 1);
  let isMobile: boolean = (windowWidth <= 1000);

  return (
    <div className='noselect'>
      <img
        alt='logo'
        style={{opacity: '0.4', position: 'fixed', top: (window.innerHeight*0.01)+'px', left: '1vw', height: (window.innerHeight*0.04)+'px', width: 'auto'}}
        src='/aurudition/img/logo.png'
      />
      {
        settings || infos ?
          <div>
            <img
              alt='quit'
              src='/aurudition/img/icons/quit.png'
              style={{
                ...styles.topRightButtons,
                height: isMobile ? isVertical? (window.innerHeight*0.05)+'px' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? (window.innerHeight*0.01)+'px' : '1vw' : '0.5vw',
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
                  instrumentsItemsList={instrumentsItemsList}
                  setinstrumentsItemsList={(instrumentsItemsList) => setinstrumentsItemsList(instrumentsItemsList) }
                  instrument={instrument}
                  setinstrument={(instrument) => setinstrument(instrument) }
                  notesNaming={notesNaming}
                  setnotesNaming={(notesNaming) => setnotesNaming(notesNaming) }
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
                height: isMobile ? isVertical? (window.innerHeight*0.05)+'px' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? (window.innerHeight*0.06)+'px' : '6vw' : '3.5vw',
              }}
              onClick={() => setinfos(true) }
            />
            <img
              alt='settings'
              src='/aurudition/img/icons/settings.png'
              style={{
                ...styles.topRightButtons,
                height: isMobile ? isVertical? (window.innerHeight*0.05)+'px' : '5vw' : '3vw',
                width: 'auto',
                right: isMobile ? isVertical? (window.innerHeight*0.01)+'px' : '1vw' : '0.5vw',
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
              setmidiNotePlaying={(midiNotePlaying) => playNote(midiNotePlaying, instrument) }
              setmidiChordPlaying={(midiChordPlaying) => playChord(midiChordPlaying, instrument) }
              instrumentsItemsList={instrumentsItemsList}
              setinstrumentsItemsList={(instrumentsItemsList) => setinstrumentsItemsList(instrumentsItemsList) }
              notesNaming={notesNaming}
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
        windowHeight={windowHeight}
        setmanualFinding={(manualFinding) => setmanualFinding(manualFinding) }
        setmanualChordFinding={(callback) => {
          const manualChordFindingTemp = [...manualChordFinding];
          manualChordFindingTemp[callback] = true;
          setmanualChordFinding(manualChordFindingTemp);
        }}
        setmidiNotePlaying={(midiNotePlaying) => playNote(midiNotePlaying, instrument) }
      />

      <DummyImgs />

      <div style={{
        position:'fixed',
        bottom: '-100vh',
        right: '-100vw',
      }}>
        <MIDISounds
          ref={(ref) => (MIDISounds.midiSounds = ref)}
          appElementName="root"
          instruments={[3]}
        />
      </div>
    </div>
  );
}
