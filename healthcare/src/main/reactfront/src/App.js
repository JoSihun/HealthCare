import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Header from './components/Header';
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="App">
          <Navigation />
          <Header />
          <Body />
          <Footer />

    </div>
  );
}

export default App;
