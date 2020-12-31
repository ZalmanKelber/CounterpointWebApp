import React from "react";

import "../css/SelectCantusFirmusIndex.css";

class SelectCantusFirmusIndex extends React.Component {

    handleClick = async newValue => {
        await this.props.updateValue(newValue);
        this.props.goForward();
    }

    render() {
        return (
            <>
            <h1 className="create-title">BUILD YOUR OWN EXAMPLE</h1>
            <h2 className="step-title">STEP 4: CHOOSE ORIENTATION</h2>
            <div className="step-content">
                <div className="cantus-firmus-index-options">
                    <div className="cantus-firmus-index-option" onClick={() => this.handleClick(1)}>
                        Cantus Firmus on top
                    </div>
                    <div className="cantus-firmus-index-option" onClick={() => this.handleClick(0)}>
                        Cantus Firmus on bottom
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SelectCantusFirmusIndex;