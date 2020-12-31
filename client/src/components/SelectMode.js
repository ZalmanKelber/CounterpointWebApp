import React from "react";

import "../css/SelectModes.css";

class SelectMode extends React.Component {

    handleClick = async newValue => {
        await this.props.updateValue(newValue);
        this.props.goForward();
    }

    render() {
        return (
            <>
            <h1 className="create-title">BUILD YOUR OWN EXAMPLE</h1>
            <h2 className="step-title">STEP 2: CHOOSE MODE</h2>
            <div className="step-content">
                <div className="show-modes">
                    <div className="mode-selection" onClick={() => this.handleClick("ionian")}>
                        <h3 className="mode-title">Ionian</h3>
                        <p className="mode-quote"><em>“…simple as ‘Do Re Mi’”</em> — Michael Jackson</p>
                    </div>
                    <div className="mode-selection" onClick={() => this.handleClick("dorian")}>
                        <h3 className="mode-title">Dorian</h3>
                        <p className="mode-quote"><em>“...harmony that would fittingly imitate the utterances and accents of a brave man who is engaged in warfare or in any enforced business”</em> — Plato</p>
                    </div>
                    <div className="mode-selection" onClick={() => this.handleClick("phrygian")}>
                        <h3 className="mode-title">Phrygian</h3>
                        <p className="mode-quote"><em>“…for such a man engaged in works of peace, not enforced but voluntary, either trying to persuade somebody of something and imploring him”</em> — Plato</p>
                    </div>
                    <div className="mode-selection" onClick={() => this.handleClick("lydian")}>
                        <h3 className="mode-title">Lydian</h3>
                        <p className="mode-quote"><em>“…and ever, against eating cares, lap me in soft Lydian airs”</em> — John Milton</p>
                    </div>
                    <div className="mode-selection" onClick={() => this.handleClick("mixolydian")}>
                        <h3 className="mode-title">Mixolydian</h3>
                        <p className="mode-quote"><em>“Some of them make men sad and grave, like the so called Mixolydian”</em> — Aristotle</p>
                    </div>
                    <div className="mode-selection" onClick={() => this.handleClick("aeolian")}>
                        <h3 className="mode-title">Aeolian</h3>
                        <p className="mode-quote"><em>“The perfection of conversation is not to play a regular sonata, but, like the Aeolian harp, to await the inspiration of the passing breeze”</em> — Edmund Burke</p>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SelectMode;