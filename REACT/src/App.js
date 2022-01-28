import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Student from './pages/Student';
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Student}/>
        <Route exact path="/add-student" component={AddStudent}/>
      </Switch>
    </Router>
  );
}

export default App;
