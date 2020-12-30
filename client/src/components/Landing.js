
import React from "react";
import "../css/Landing.css"
import { Link } from "react-router-dom";

class Landing extends React.Component {
    titleString = "C O U N T E R P O I N T   G E N E R A T O R"

    render() {
        return (
            <>
            <div id="landing" className="landing">
                <h1 className="title">C O U N T E R P O I N T &emsp; &emsp; G E N E R A T O R</h1>
            </div>
            <div id="menu" className="menu">
                <Link to="/generate">
                    <h3 className="menu-option">GENERATE EXAMPLES</h3>
                </Link>
                <Link to="/gallery">
                    <h3 className="menu-option">GALLERY</h3>
                </Link>
                <Link to="/about">
                    <h3 className="menu-option">ABOUT</h3>
                </Link>
            </div>
            </>
        );
    }

}

export default Landing 