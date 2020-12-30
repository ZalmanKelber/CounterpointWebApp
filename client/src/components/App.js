import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing"

const App = () => {
  return (
      <BrowserRouter>
          <Route path="/" exact component={Landing} />
      </BrowserRouter>
  );
}

export default App;