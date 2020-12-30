import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing"
import Enter from "./Enter"

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Enter} />
      <Route path="/landing" exact component={Landing} />
    </BrowserRouter>
  );
}

export default App;