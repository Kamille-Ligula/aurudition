import React, { useState, useEffect } from "react";
import {chordTypes} from '../const/chords';
import {styles} from '../styles/styles.js';
import '../styles/styles.css';

export const Settings = (props) => {
	const [state, setstate] = useState(props);
	const [defaultCheck, setdefaultCheck] = useState([]);

	useEffect(() => {
		setstate(props);

		const defaultCheckTemp = [false, false, false, false];
		defaultCheckTemp[props.notesNaming] = true;
		setdefaultCheck(defaultCheckTemp);

		for (let i=0; i<props.userChords.length; i++) {
			document.getElementById("userChords"+i).defaultChecked = props.userChords[i];
		}

		document.getElementById("colorKeys").defaultChecked = props.showRedAndGreenKeys;
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

	function pickInstrument(e) {
		props.setinstrument(e);
		localStorage.setItem("instrumentID", e);
	}

	let isVertical = (state.windowWidth/state.windowHeight < 1);

	function onChangeValue(e) {
		props.setnotesNaming(e.target.value);
		localStorage.setItem("notesNaming", e.target.value);
	}

	return (
		<div
			className='innerWindow infosAndSettings'
			style=
				{{
					top: (state.windowHeight*0.06)+'px',
					height: (state.windowHeight*0.55)+'px'
				}}
		>
			<div>
				{/* Notes naming convention */}
				<span style={styles.infoTitle}>
					Notation:
				</span>
				<div>
					<div style={{fontSize: isVertical ? '36px' : '' }} onChange={onChangeValue}>
						<input className={isVertical ? 'vertical' : 'horizontal'} type="radio" value={0} defaultChecked={defaultCheck[0]} name="notation" /> English (C, D, E, F, G, A, B)<br/>
						<input className={isVertical ? 'vertical' : 'horizontal'} type="radio" value={1} defaultChecked={defaultCheck[1]} name="notation" /> German (C, D, E, F, G, A, (B,) H)<br/>
						<input className={isVertical ? 'vertical' : 'horizontal'} type="radio" value={2} defaultChecked={defaultCheck[2]} name="notation" /> Italian (do, re, mi, fa, sol, la, si)<br/>
						<input className={isVertical ? 'vertical' : 'horizontal'} type="radio" value={3} defaultChecked={defaultCheck[3]} name="notation" /> Jianpu (1, 2, 3, 4, 5, 6, 7)
					</div>
				</div>

				<p/>

				<span style={styles.infoTitle}>
					Instrument:
				</span>
				{/* Instrument */}
				<div>
					<select
						style={isVertical ? styles.selectionButtonVerticalInSettings : styles.selectionButtonInSettings}
						value={state.instrument}
						id="instrumentsList"
						onChange={(e) => { pickInstrument(e.target.value) }}
					>
						{
							state.instrumentsItemsList
						}
					</select>
				</div>
				<input 
					className='button' 
					type="button" 
					value="Reset default" 
					style={isVertical ? styles.settingsButtonVertical : styles.settingsButton} 
					onClick={() => { pickInstrument(3) }} 
				/>
			</div>

			<p/>

			{/* Color keys Option */}
			<span style={styles.infoTitle}>
				Key colors:
			</span>
			<div>
				<label>
					<input
						type="checkbox"
						style={{transform: isVertical ? 'scale(1.5)' : 'scale(1)' }}
						id="colorKeys"
						onClick={(e) => handleColorKeysChange(e)}
					/>
					&nbsp;Color wrong keys in red and right keys in green (highly recommended for chord tests)
				</label>
			</div>

			<p/>

			{/* Chords */}
			<span style={styles.infoTitle}>
				Chords:
			</span>
			<br/>Note: practicing recognizing chords requires a 20-semitone range configuration or larger.
			<div style={{textAlign: 'left'}}>
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
							&nbsp;<span style={{fontWeight: 'bold'}}>{item.name}</span> ({item.explanation})
							<br/>
						</label>
					))
				}
			</div>
		</div>
	)
}
