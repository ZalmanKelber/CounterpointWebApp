import React from "react";

import "../css/SelectLength.css";

class SelectLength extends React.Component {

    handleClick = async newValue => {
        await this.props.updateValue(newValue);
        this.props.goForward();
    }

    render() {
        const stepNumber = this.props.currentSelections.type.
            substring(this.props.currentSelections.type.length - 7) === "Species" ? 5 : 4;

        const measureOptions = ["twoPartFreeCounterpoint", "twoPartImitativeCounterpoint"]
            .includes(this.props.currentSelections.type) ? [14, 15, 16] : [8, 9, 10, 11, 12]
        return (
            <>
            <h1 className="create-title">BUILD YOUR OWN EXAMPLE</h1>
            <h2 className="step-title">STEP {stepNumber}: CHOOSE NUMBER OF MEASURES</h2>
            <div className="step-content">
                <div className="length-options">
                    {
                        measureOptions.map((measure, i) => {
                            return (
                                <div 
                                    key={i} 
                                    className="measure-option"
                                    onClick={() => this.handleClick(measure)}
                                >
                                    {measure}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            </>
        );
    }
}

export default SelectLength;