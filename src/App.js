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

  const [currentText, setCurrentText] = useState('初始文字');
  const [newText, setNewText] = useState('');
  const [newTextAnimation, setNewTextAnimation] = useState(''); // 定义 newTextAnimation 状态及其更新函数


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
      }, 300); // 假设动画持续时间为 500ms
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
    const albumPosition = document.getElementById('album').offsetTop;

    // 计算下一个区块的开始位置作为当前区块的结束条件
    // 注意：这里假设相册是最后一个区块，所以它的结束条件稍有不同
    if (scrollPosition >= titlePosition && scrollPosition < introductionPosition) {
      setNewText('標題');
    } else if (scrollPosition >= introductionPosition && scrollPosition < albumPosition) {
      setNewText('介紹');
    } else if (scrollPosition >= albumPosition) {
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
      <div className="fixedBox">
        <div className={`verticalText ${newTextAnimation}`}>{currentText}</div>
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
