import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing";
import Enter from "./Enter";
import Create from "./Create";
import Gallery from "./Gallery";

import "../css/App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Enter} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/create" exact component={Create} />
      <Route path="/gallery" exact component={Gallery} />
    </BrowserRouter>
  );
}

export default App;