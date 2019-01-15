import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './component/App';
import CycleEditor from './component/CycleEditor';

const CycleRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/editor" component={CycleEditor} />
    </div>
  </Router>
);


export default CycleRouter;