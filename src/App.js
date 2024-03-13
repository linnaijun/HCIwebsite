import Title from './Title';
import Introduction from './Introduction';
import Camp from './camp';
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
    document.title = "網頁標題";
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
    // 获取视窗高度的一半
    const halfWindowHeight = window.innerHeight / 2;
    // 计算当前滚动位置加上半个视窗的高度
    const scrollPosition = window.pageYOffset + halfWindowHeight;
  
    // 获取每个区块顶部的位置
    const titlePosition = document.getElementById('title').offsetTop;
    const introductionPosition = document.getElementById('introduction').offsetTop;
    const campPosition = document.getElementById('camp').offsetTop;
  
    // 根据滚动位置更新文本和背景色
    if (scrollPosition >= titlePosition && scrollPosition < introductionPosition) {
      setNewText('標題');
      setSidebarBgColor(COLORS.oddSectionBackground);
    } else if (scrollPosition >= introductionPosition && scrollPosition < campPosition) {
      setNewText('介紹');
      setSidebarBgColor(COLORS.evenSectionBackground);
    } else if (scrollPosition >= campPosition) {
      setNewText('相冊');
      // 假设相册页面视为奇数页面
      setSidebarBgColor(COLORS.oddSectionBackground);
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
    <button className="linkButton" onClick={() => scrollToSection('introduction')}>介紹</button>
    <button className="linkButton" onClick={() => scrollToSection('camp')}>相冊</button>
  </div> </div>
    <div className="content" style={{paddingTop: '60px'}}> {/* 添加顶部留白以避免内容被标题栏遮挡 */}
    <div className="fixedBox" style={{ backgroundColor: sidebarBgColor }}>
        <div className={`verticalText ${newTextAnimation}`}>{currentText}</div>
      </div>
      <Title height="1000px" id="title"/>
      <Introduction height="2000px" id="introduction"/>
      <Camp height="3000px" id="camp"/>
      <button onClick={scrollToTop} className="scrollToTopButton"></button>
    </div>
  </div>
  );
}


export default App;
