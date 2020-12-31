import React from "react";
import axios from "axios";

import "../css/DisplayResult.css";

class DisplayResult extends React.Component {

    state = {
        waitingForResults: true,
        waitingForResultsDisplayPhase: 0
    }

    componentDidMount = async () => {
        const jsonRequest = JSON.stringify(this.props.currentSelections);
        const handler = setInterval(() => {
            if (!this.state.waitingForResults) {
                clearInterval(handler);
                this.setState({ ...this.state, waitingForResultsDisplayPhase: 0 });
            } else {
                let nextPhase = this.state.waitingForResultsDisplayPhase + 1
                nextPhase %= 10;
                this.setState({ ...this.state, waitingForResultsDisplayPhase: nextPhase });
            }
        }, 500);
        const res = await axios.post(
            "/api", 
            jsonRequest,  
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
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
        const waitingForResultsDisplayString = this.getWaitingForResultsDisplayString()
        return (
            <>
            {
                this.state.waitingForResults && <div className="waiting-for-results">{waitingForResultsDisplayString}</div>
            }
            </>
        );
    }
}

export default DisplayResult;