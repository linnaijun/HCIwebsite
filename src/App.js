import Title from './Title';
import Faculty from './Faculty';
import Thesis from './Thesis';
import Topics from './Topics';
import Honors from './Honors';
import Album from './Album'; // 假设 Album 是相簿组件
import Camp from './Camp';
import Contact from './Contact';
import React, { useEffect, useState } from 'react';
import './App.css'; // 確保你的樣式被正確導入

function App() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 這將使滾動動作平滑進行
    });
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop-60,
        behavior: 'smooth'
      });
    }
  };

  const [currentText, setCurrentText] = useState('標題');
  const [newText, setNewText] = useState('標題');
  const [newTextAnimation, setNewTextAnimation] = useState('標題'); // 定义 newTextAnimation 状态及其更新函数
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const COLORS = {
    oddSectionBackground: '#7EC0FC', // 原本的顏色
    evenSectionBackground: '#004B8F', // 偶數頁面的背景色
  };
  const [sidebarBgColor, setSidebarBgColor] = useState(COLORS.oddSectionBackground); // 初始背景色
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    document.title = "研究所";
  }, []); // 空依賴數組表示這個效果只會在組件掛載時運行一次

  useEffect(() => {
    // 当 newText 改变并且与 currentText 不同时，启动淡出动画
    if (newText !== currentText) {
      setNewTextAnimation('fadeOutToLeft');
    }
  }, [newText, currentText]);

  useEffect(() => {
    if (newTextAnimation === 'fadeOutToLeft') {
      // 等待淡出动画完成
      const timer = setTimeout(() => {
        setCurrentText(newText); // 更新文本
        setNewTextAnimation('fadeInFromRight'); // 启动淡入动画
      }, 200); // 假设动画持续时间为 500ms
      return () => clearTimeout(timer);
    }
  }, [newTextAnimation, newText]);




  const handleScroll = () => {
    const halfWindowHeight = window.innerHeight / 2;
    const scrollPosition = window.pageYOffset + halfWindowHeight;
    
    // 获取每个部分顶部到页面顶部的距离
    const positions = {
      title: document.getElementById('title') ? document.getElementById('title').offsetTop : 0,
      faculty: document.getElementById('faculty') ? document.getElementById('faculty').offsetTop : 0,
      thesis: document.getElementById('thesis') ? document.getElementById('thesis').offsetTop : 0,
      topics: document.getElementById('topics') ? document.getElementById('topics').offsetTop : 0,
      honors: document.getElementById('honors') ? document.getElementById('honors').offsetTop : 0,
      album: document.getElementById('album') ? document.getElementById('album').offsetTop : 0,
      camp: document.getElementById('camp') ? document.getElementById('camp').offsetTop : 0,
      contact: document.getElementById('contact') ? document.getElementById('contact').offsetTop : 0,
    };
  
    // 使用if-else if结构来根据滚动位置设置newText和sidebarBgColor
    if (scrollPosition >= positions.title && scrollPosition < positions.faculty) {
      setNewText('標題');
      setSidebarBgColor(COLORS.oddSectionBackground);
    } else if (scrollPosition >= positions.faculty && scrollPosition < positions.thesis) {
      setNewText('師資');
      setSidebarBgColor(COLORS.evenSectionBackground);
    } else if (scrollPosition >= positions.thesis && scrollPosition < positions.topics) {
      setNewText('論文');
      setSidebarBgColor(COLORS.oddSectionBackground);
    } else if (scrollPosition >= positions.topics && scrollPosition < positions.honors) {
      setNewText('主題');
      setSidebarBgColor(COLORS.evenSectionBackground);
    } else if (scrollPosition >= positions.honors && scrollPosition < positions.album) {
      setNewText('榮譽榜');
      setSidebarBgColor(COLORS.oddSectionBackground);
    } else if (scrollPosition >= positions.album && scrollPosition < positions.camp) {
      setNewText('相簿');
      setSidebarBgColor(COLORS.evenSectionBackground);
    } else if (scrollPosition >= positions.camp && scrollPosition < positions.contact) {
      setNewText('營隊');
      setSidebarBgColor(COLORS.oddSectionBackground);
    } else if (scrollPosition >= positions.contact) {
      setNewText('聯絡資訊');
      setSidebarBgColor(COLORS.evenSectionBackground);
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
      <div className="header">
        <button className="menuButton" onClick={toggleMenu}>Menu</button>
        <div className={`links ${isMenuOpen ? 'show' : ''}`}>
          <button className="linkButton" onClick={() => scrollToSection('title')}>標題</button>
          <button className="linkButton" onClick={() => scrollToSection('faculty')}>師資</button>
          <button className="linkButton" onClick={() => scrollToSection('thesis')}>論文</button>
          <button className="linkButton" onClick={() => scrollToSection('topics')}>主題</button>
          <button className="linkButton" onClick={() => scrollToSection('honors')}>榮譽榜</button>
          <button className="linkButton" onClick={() => scrollToSection('album')}>相簿</button>
          <button className="linkButton" onClick={() => scrollToSection('camp')}>營隊</button>
          <button className="linkButton" onClick={() => scrollToSection('contact')}>聯絡資訊</button>
        </div>
      </div>
  
      <div className="content" style={{paddingTop: '60px'}}>
        <div className="fixedBox" style={{ backgroundColor: sidebarBgColor }}>
          <div className={`verticalText ${newTextAnimation}`}>{currentText}</div>
        </div>
        <Title height="1000px" id="title"/>
        <Faculty height="800px" id="faculty"/>
        <Thesis height="800px" id="thesis"/>
        <Topics height="800px" id="topics"/>
        <Honors height="800px" id="honors"/>
        <Album height="800px" id="album"/>
        <Camp height="800px" id="camp"/>
        <Contact height="800px" id="contact"/>
        <button onClick={scrollToTop} className="scrollToTopButton"></button>
      </div>
    </div>
  );
  
}

export default App;
