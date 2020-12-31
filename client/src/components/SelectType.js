import React from "react";

import "../css/SelectType.css";

class SelectType extends React.Component {

    handleClick = async newValue => {
        await this.props.updateValue(newValue);
        await this.props.goForward();
    }

    render() {

        return (
            <>
            <h1 className="create-title">BUILD YOUR OWN EXAMPLE</h1>
            <h2 className="step-title">STEP 1: CHOOSE TYPE</h2>
            <div className="step-content">
                <div className="show-types">
                    <div className="arrow-container">
                        <div className="arrow-text">( Simpler / Faster )</div>
                        <div className="upward-triangle"></div>
                        <div className="arrow-body"></div>
                        <div className="arrow-filler"></div>
                        <div className="arrow-body"></div>
                        <div className="downward-triangle"></div>
                        <div className="arrow-text">( More Complex</div>
                    </div>
                    <div className="type-title solo-melody-title">Solo Melodies:</div>
                    <div className="type-title species-counterpoint-title">Species Counterpoint:</div>
                    <div className="type-title two-part-counterpoint-title">Two Part Counterpoint:</div>
                    <div className="type-selection cantus-firmus" onClick={() => this.handleClick("cantusFirmus")}>Cantus Firmus</div>
                    <div className="type-selection free-melody" onClick={() => this.handleClick("freeMelody")}>Free Melody</div>
                    <div className="type-selection first-species" onClick={() => this.handleClick("twoPartFirstSpecies")}>First Species</div>
                    <div className="type-selection second-species" onClick={() => this.handleClick("twoPartSecondSpecies")}>Second Species</div>
                    <div className="type-selection third-species" onClick={() => this.handleClick("twoPartThirdSpecies")}>Third Species</div>
                    <div className="type-selection fourth-species" onClick={() => this.handleClick("twoPartFourthSpecies")}>Fourth Species</div>
                    <div className="type-selection fifth-species" onClick={() => this.handleClick("twoPartFifthSpecies")}>Fifth Species</div>
                    <div className="type-selection free-counterpoint" onClick={() => this.handleClick("twoPartFreeCounterpoint")}>Free Counterpoint</div>
                    <div className="type-selection imitative-counterpoint" onClick={() => this.handleClick("twoPartImitativeCounterpoint")}>Imitative Counterpoint</div>
                    <div className="preview-image cantus-firmus-preview"></div>
                    <div className="preview-image free-melody-preview"></div>
                    <div className="preview-image first-species-preview"></div>
                    <div className="preview-image second-species-preview"></div>
                    <div className="preview-image third-species-preview"></div>
                    <div className="preview-image fourth-species-preview"></div>
                    <div className="preview-image fifth-species-preview"></div>
                    <div className="preview-image free-counterpoint-preview"></div>
                    <div className="preview-image imitative-counterpoint-preview"></div>
                    
                </div>
            </div>
            </>
        );
    }
}

export default SelectType;