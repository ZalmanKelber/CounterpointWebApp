import React from "react";


import Navbar from "./Navbar";

import "../css/About.css"

class About extends React.Component {


    render() {

        return (
            <div className="about">
                <Navbar />
                <h1 className="create-title">ABOUT</h1>
            </div>
        );
    }

}

export default About