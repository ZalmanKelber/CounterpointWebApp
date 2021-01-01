import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import "../css/DisplayResult.css";

class DisplayResult extends React.Component {

    state = {
        waitingForResults: true,
        waitingForResultsDisplayPhase: 0,
        blobURL: null
    }

    componentDidMount = async () => {
        const jsonRequest = JSON.stringify(this.props.currentSelections);
        const handler = setInterval(() => {
            console.log("running interval handler");
            if (this.state.blobURL) {
                clearInterval(handler);
                this.setState({ ...this.state, waitingForResultsDisplayPhase: 0 });
            } else {
                let nextPhase = this.state.waitingForResultsDisplayPhase + 1
                nextPhase %= 10;
                this.setState({ ...this.state, waitingForResultsDisplayPhase: nextPhase });
            }
        }, 500);
        const xml = new XMLHttpRequest();
        xml.open("POST", "/api");
        xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xml.responseType = "blob";
        xml.onload = e => {
              const url = window.URL.createObjectURL(xml.response);
              console.log(url);
              this.setState({ ...this.state, blobURL: url });
          };
        xml.send(jsonRequest);
        this.setState({ ...this.state, waitingForResults: false});

    }

    getWaitingForResultsDisplayString = () => {
        switch (this.state.waitingForResultsDisplayPhase) {
            case 0:
                return "";
                break;
            case 1:
                return ".";
                break;
            case 2:
                return "..";
                break;
            case 3:
                return "...";
                break;
            default:
                return "...waiting for results";
        }
    }

    downloadAudio = () => {
        const link = document.createElement("a");
        link.download = "counterpoint.wav";
        link.href = this.state.blobURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        console.log(this.state.blobURL);
        const waitingForResultsDisplayString = this.getWaitingForResultsDisplayString();

        return (
            <>
            {
                !this.state.blobURL && <div className="waiting-for-results">{waitingForResultsDisplayString}</div>
            }
            {
                this.state.blobURL && 
                <div className="success-container">
                    <h2 className="success-title">Success!<br /><br />Here's the file you generated.  You can play it or download it.</h2>
                    <div className="audio-player-container">
                        <AudioPlayer
                            autoPlay
                            src={this.state.blobURL}
                            showJumpControls={false}
                            customAdditionalControls={[]}
                            customVolumeControls={[]}
                            layout="horizontal-reverse"
                        />
                    </div>
                    <div className="download-button" onClick={this.downloadAudio}>
                        Download Audio
                    </div>
                </div>
    
            }
            </>
        );
    }
}

export default DisplayResult;