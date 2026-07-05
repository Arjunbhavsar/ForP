import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MemoryLane from './MemoryLane';
import Gallery from './Gallery';
import DateGame from './DateGame';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode> 
  <HashRouter> 
    <Routes> 
      <Route path="/" element={<App />} /> 
      <Route path="/memory-lane" element={<MemoryLane />} /> 
      <Route path="/gallery" element={<Gallery />} /> 
      <Route path="/date-game" element={<DateGame />} /> 
    </Routes> 
  </HashRouter> 
</React.StrictMode>
);

{/* <React.StrictMode> 
  <BrowserRouter basename="/ForP"> 
    <Routes> 
      <Route path="/" element={<App />} /> 
      <Route path="/memory-lane" element={<MemoryLane />} /> 
      <Route path="/gallery" element={<Gallery />} /> 
      <Route path="/date-game" element={<DateGame />} /> 
    </Routes> 
  </BrowserRouter> 
</React.StrictMode> */}