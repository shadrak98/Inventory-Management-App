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
    <React.Fragment>
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h2>Inventory Management Application</h2>
        <p className="lead">This is Home Page of Inventory Management Application.</p>
      </div>
    </main>
    </React.Fragment>
  );
}

export default App;
