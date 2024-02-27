import Title from './Title';
import Introduction from './Introduction';
import Album from './Album';
import React, { useEffect, useState, useRef } from 'react';
import './App.css'; // 確保你的樣式被正確導入

function App() {
  const [currentSection, setCurrentSection] = useState('');
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 這將使滾動動作平滑進行
    });
  };

  const [sidebarText, setSidebarText] = useState('初始文字');

  const handleScroll = () => {
    const titlePosition = document.getElementById('title').offsetTop;
    const introductionPosition = document.getElementById('introduction').offsetTop;
    const albumPosition = document.getElementById('album').offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= titlePosition && scrollPosition < introductionPosition) {
      setSidebarText('標題');
    } else if (scrollPosition >= introductionPosition && scrollPosition < albumPosition) {
      setSidebarText('介紹');
    } else if (scrollPosition >= albumPosition) {
      setSidebarText('相冊');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    
    <div className="App">
        <div className="fixedBox">
        <div className="verticalText">{sidebarText}</div>
      </div>
      <Title height="1000px" />
      <Introduction height="2000px" />
      <Album height="3000px" />
      <button onClick={scrollToTop} className="scrollToTopButton"></button>

      
    </div>
  );
}
const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  cursor: 'pointer',
  width: '150px', // 按鈕的寬度
  height: '150px', // 按鈕的高度
  padding: '10px', // 如果需要的話，增加一些內邊距來增加點擊區域
  
};

export default App;
