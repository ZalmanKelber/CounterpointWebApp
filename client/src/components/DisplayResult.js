import React from "react";

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
                <div className="results">
                    <h4>Success!!  Here's the file you generated.  You can play it or download it.</h4>
                    <audio 
                    id="wavSource" 
                    src={this.state.blobURL} 
                    type="audio/wav" 
                    controls
                    autoPlay
                />
                </div>
    
            }
            </>
        );
    }
}

export default DisplayResult;