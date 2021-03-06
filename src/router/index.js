import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../component/App';

const CycleRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);

export default CycleRouter;