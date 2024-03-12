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

    // 计算下一个区块的开始位置作为当前区块的结束条件
    // 注意：这里假设相册是最后一个区块，所以它的结束条件稍有不同
    if (scrollPosition >= titlePosition && scrollPosition < introductionPosition) {
      setNewText('標題');
    } else if (scrollPosition >= introductionPosition && scrollPosition < campPosition) {
      setNewText('介紹');
    } else if (scrollPosition >= campPosition) {
      setNewText('相冊');
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
      <button className="linkButton" onClick={() => scrollToSection('title')}>標題</button>
      <button className="linkButton" onClick={() => scrollToSection('introduction')}>介紹</button>
      <button className="linkButton" onClick={() => scrollToSection('camp')}>相冊</button>
    </div>
    <div className="content" style={{paddingTop: '60px'}}> {/* 添加顶部留白以避免内容被标题栏遮挡 */}
      <div className="fixedBox">
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
