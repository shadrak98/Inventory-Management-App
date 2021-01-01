import React from 'react';
import Nav from './Components/Nav';
import Locations from './Pages/Locations';
import Products from './Pages/Products';
import ProductMovement from './Pages/ProductMovement';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/locations" component={Locations} />
        <Route path="/productmovement" component={ProductMovement} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <h2>Home Page</h2>
  );
}

export default App;
