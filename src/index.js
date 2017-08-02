import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Tweet from './components/Tweet';
import NotFound from './components/notFound';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/tweet" component={Tweet} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
