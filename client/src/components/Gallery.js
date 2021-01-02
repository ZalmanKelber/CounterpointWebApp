import React from "react";
import AudioPlayer from "react-h5-audio-player";

import Navbar from "./Navbar";

import "../css/Gallery.css"

import ionianAudio from "../frontendAudio/ionian.wav";
import dorianAudio from "../frontendAudio/dorian.wav";
import phrygianAudio from "../frontendAudio/phrygian.wav";
import lydianAudio from "../frontendAudio/lydian.wav";
import mixolydianAudio from "../frontendAudio/mixolydian.wav";
import aeolianAudio from "../frontendAudio/aeolian.wav";

import ionianImage from "../images/ionian_example.png";
import dorianImage from "../images/dorian_example.png";
import phrygianImage from "../images/phrygian_example.png";
import lydianImage from "../images/lydian_example.png";
import mixolydianImage from "../images/mixolydian_example.png";
import aeolianImage from "../images/aeolian_example.png";

const modes = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian"];
const audioFiles = [ionianAudio, dorianAudio, phrygianAudio, lydianAudio, mixolydianAudio, aeolianAudio];
const imageFiles = [ionianImage, dorianImage, phrygianImage, lydianImage, mixolydianImage, aeolianImage];

class Gallery extends React.Component {

    state = { selectedMode: "dorian" }

    selectMode = mode => {
        this.setState({ ...this.state, selectedMode: mode })
    }


    render() {

        return (
            <div className="main">
                <Navbar />
                <div className="gallery-container">
                    <div className="list-modes">
                        {
                            modes.map((mode, i) => {
                                return (
                                    <div className="mode-title" onClick={() => this.selectMode(mode)} >{mode}</div>
                                )
                            })
                        }
                    </div>
                    {
                        modes.map((mode, i) => {
                            {console.log(mode)}
                            if (this.state.selectedMode === mode) {
                                return (
                                    <div key={i} className="mode-display-container">
                                        <div className="gallery-audio-wrapper">
                                            <AudioPlayer
                                                autoPlay
                                                src={audioFiles[i]}
                                                showJumpControls={false}
                                                customAdditionalControls={[]}
                                                customVolumeControls={[]}
                                                layout="horizontal-reverse"
                                            />
                                        </div>
                                        <img className="gallery-image" src={imageFiles[i]} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Gallery