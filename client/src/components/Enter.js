import React from "react";
import { Link } from "react-router-dom";

import "../css/Enter.css"

class Enter extends React.Component {


    render() {

        return (
            <div className="enter">
                <div className="click-to-enter">
                    <Link to="/landing">
                    CLICK TO ENTER
                    </Link>
                </div>
            </div>
        );
    }

}

export default Enter