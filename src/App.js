import React, { useState, useEffect } from "react";
import {Piano} from './components/Piano';
import {Controls} from './components/Controls';
import {Infos} from './components/Infos';

export default function App() {
  const [riddle, setriddle] = useState([]);
  const [instrument, setinstrument] = useState(localStorage.getItem("instrument") || 'acoustic_grand_piano-mp3');
  const [answer, setanswer] = useState(false);
  const [lowerNoteAndPitch, setlowerNoteAndPitch] = useState(localStorage.getItem("lowerNoteAndPitch") || 'C3');
  const [higherNoteAndPitch, sethigherNoteAndPitch] = useState(localStorage.getItem("higherNoteAndPitch") || 'C4');
  const [divisor, setdivisor] = useState(window.innerWidth/window.innerHeight*8);
  const [manualFinding, setmanualFinding] = useState(false);
  const [manualChordFinding, setmanualChordFinding] = useState([false, false, false]);
  const [showRedAndGreenKeys, setshowRedAndGreenKeys] = useState();
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const [infos, setinfos] = useState(false);
  const [whiteHeight] = useState(202/8);

  useEffect(() => {
    setanswer(manualFinding);
  }, [manualFinding]);

  useEffect(() => {
    if (manualChordFinding.indexOf(false) === -1) {
      setanswer(true);
    }
  }, [manualChordFinding]);

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

  return (
    <div className='noselect'>
      {
        infos ?
          <div>
            <div className='infoButton'>
              <img
                alt='quiticon'
                src='/aurudition/img/icons/quiticon.png'
                style={{
                  height: '6vh',
                  width: 'auto',
                }}
                onClick={() => setinfos(false) }
              />
            </div>

            <Infos
              whiteHeight={whiteHeight}
              windowHeight={windowHeight}
            />
          </div>
        :
          <div>
            <div className='infoButton'>
              <img
                alt='infoicon'
                src='/aurudition/img/icons/infoicon.png'
                style={{
                  height: '6vh',
                  width: 'auto',
                }}
                onClick={() => setinfos(true) }
              />
            </div>

            <Controls
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            divisor={divisor}
            instrument={instrument}
            setinstrument={(instrument) => setinstrument(instrument) }
            lowerNoteAndPitch={lowerNoteAndPitch}
            setlowerNoteAndPitch={(lowerNoteAndPitch) => setlowerNoteAndPitch(lowerNoteAndPitch) }
            higherNoteAndPitch={higherNoteAndPitch}
            sethigherNoteAndPitch={(higherNoteAndPitch) => sethigherNoteAndPitch(higherNoteAndPitch) }
            showRedAndGreenKeys={showRedAndGreenKeys}
            setshowRedAndGreenKeys={(showRedAndGreenKeys) => setshowRedAndGreenKeys(showRedAndGreenKeys) }
            answer={answer}
            setanswer={(answer) => setanswer(answer) }
            manualFinding={manualFinding}
            setmanualFinding={(manualFinding) => setmanualFinding(manualFinding) }
            manualChordFinding={manualChordFinding}
            setmanualChordFinding={(manualChordFinding) => { setmanualChordFinding(manualChordFinding) }}
            riddle={riddle}
            setriddle={(riddle) => setriddle(riddle) }
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
    </div>
  );
}
