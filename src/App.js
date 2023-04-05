import './App.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';
import Footer from './components/Footer';

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routes";

const App = () => (
  <Router>
      <Header />
    <div className="App">
      <Routing />
    </div>
      <Footer />
  </Router>
);

export default App;
