import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Index from './Components/Layout/Index'
import {Provider} from './Context'
function App() {
  return (
<Provider>
<Router>
<React.Fragment>
 <Navbar/>
<div className="container">
<Switch>
<Route exact path="/" component={Index}/>
</Switch>
</div>
</React.Fragment>
</Router>
</Provider>
  );
}

export default App;
