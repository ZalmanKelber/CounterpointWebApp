import React from "react";
import AudioPlayer from "react-h5-audio-player";

import Navbar from "./Navbar";
import Footer from "./Footer";

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

    state = { selectedMode: null }

    selectMode = mode => {
        this.setState({ ...this.state, selectedMode: mode })
    }


    render() {

        return (
            <div className="main">
                <Navbar />
                <h1 className="create-title">GALLERY</h1>
                <h2 className="gallery-instructions">Click on a mode to view one of the best examples of imitative counterpoint produced by the program</h2>
                <div className="gallery-container">
                    <div className="list-modes">
                        {
                            modes.map((mode, i) => {
                                return (
                                    <div key={i} className="mode-title-container" onClick={() => this.selectMode(mode)} >
                                        <div className="mode-title">{mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        modes.map((mode, i) => {
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
                <Footer />
            </div>
        );
    }

}

export default Gallery