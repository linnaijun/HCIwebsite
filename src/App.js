import Title from './Title';
import Introduction from './Introduction';
import Album from './Album';
import React, { useEffect, useState, useRef } from 'react';
import './App.css'; // 確保你的樣式被正確導入

function App() {

 

  
  return (
    
    <div className="App">
      <Title height="1000px" />
      <Introduction height="2000px" />
      <Album height="3000px" />
    </div>
  );
}

export default App;
