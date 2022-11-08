import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/useEffectApi';
import About from './components/infopage';


const App = () =>{
  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about/:id" element={<About/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
