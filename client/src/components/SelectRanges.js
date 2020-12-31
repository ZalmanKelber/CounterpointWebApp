import React from "react";

import SelectStepHeader from "./SelectStepHeader";

import "../css/SelectRanges.css";

class SelectRanges extends React.Component {

    state = {
        selected: []
    }

    handleSubmit = async () => {
        await this.props.updateValue(this.state.selected);
        this.props.goForward();
    }

    getNumberOfLines = () => {
        return ["cantusFirmus", "freeMelody"].includes(this.props.currentSelections.type) ? 1 : 2;
    }

    handleClick = vocalRange => {
        let rangeList = [vocalRange]
        if (this.getNumberOfLines() === 2) {
            switch (vocalRange) {
                case "soprano":
                    rangeList = ["alto", "soprano"];
                    break;
                case "alto":
                    rangeList.push("soprano");
                    break;
                case "tenor":
                    rangeList.push("alto");
                    break;
                case "bass":
                    rangeList.push("tenor");
            }
        } 
        this.setState({ ...this.state, selected: rangeList });
    }

    render() {
        const vocalRanges = ["soprano", "alto", "tenor", "bass"];
        const instructionString = this.getNumberOfLines() === 2 ? "TWO VOCAL RANGES" : "A VOCAL RANGE";
        const stepTitle = `STEP 3: CHOOSE ${instructionString}`
        return (
            <>
            <SelectStepHeader 
                stepTitle={stepTitle}
                showGoBackButton={true}
                goBackFunction={this.props.goBackward}
            />
            <div className="step-content">
                <div className="choose-range-content">
                    <div className="ranges-container">
                        {
                            vocalRanges.map((vocalRange, i) => {
                                const classList = this.state.selected.includes(vocalRange) ? "range selected-range" : "range";
                                return (
                                <div key={i} className={classList} onClick={() => this.handleClick(vocalRange)}>{vocalRange.toUpperCase()}</div>
                                );
                            })
                        }
                    </div>
                    <div className="continue-button" onClick={this.handleSubmit} style={{ display: this.state.selected.length === 0 ? "none" : "block" }}>
                        Continue
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SelectRanges;