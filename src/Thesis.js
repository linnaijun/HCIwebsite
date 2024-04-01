import React, { useRef, useState, useEffect } from 'react';
import './Thesis.css';
import thesisData from './Thesis.json';
import PlanetSvg from './img/Planet.svg'; // 引入Planet.svg
import ArrowL from './img/ArrowL.svg'; // 引入左箭头SVG
import ArrowR from './img/ArrowR.svg'; // 引入右箭头SVG
function Thesis({ height }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedThesisDetails, setSelectedThesisDetails] = useState([]);
  const imageContainerRef = useRef(null);
  const detailsContainerRef = useRef(null); // 新增一个ref用于详细信息的容器

  useEffect(() => {
    const uniqueYears = Array.from(new Set(thesisData[0].map(item => item.year)))
      .sort((a, b) => b - a);
    setYears(uniqueYears);
    // 确保年份列表已经被设置
    if (uniqueYears.length > 0) {
      const latestYear = uniqueYears[0]; // 因为已经排序，所以第一个元素是最新的年份
      setSelectedYear(latestYear); // 设置当前选中的年份
      // 模拟点击最新年份，这里不直接调用 handleClick 因为它需要 index，我们已经知道是 0
      const selectedDetails = thesisData[0].filter(item => item.year === latestYear);
      setSelectedThesisDetails(selectedDetails);
    }
  }, []);


  const handleClick = (year, index) => {
    // 根据索引滚动
    const scrollX = (index - 2) * 200;
    imageContainerRef.current.scroll({
      left: scrollX,
      behavior: 'smooth',
    });
    setSelectedYear(year);
    // 根据年份更新详细信息
    const selectedDetails = thesisData[0].filter(item => item.year === year);
    setSelectedThesisDetails(selectedDetails);

    // 如果需要，也可以在这里添加滚动到详细信息容器的逻辑
  };
  const handlePlaceholderClick = (direction) => {
    if (!selectedYear) return; // 如果还没有选中任何年份，不做任何操作

    const currentIndex = years.findIndex(year => year === selectedYear);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    // 确保索引在有效范围内
    if (newIndex >= 0 && newIndex < years.length) {
      const newYear = years[newIndex];
      handleClick(newYear, newIndex);
    }
  };

  return (
    <div id="thesis" style={{ height }}>
      <div className="images-row">
        <img
          src={ArrowL}
          alt="Left Placeholder"
          className="placeholder left-placeholder"
          onClick={() => handlePlaceholderClick('prev')} // 左侧占位图点击
        />
      <div ref={imageContainerRef} className="image-container">
  {years.map((year, index) => (
    <div key={index} className="year-container" onClick={() => handleClick(year, index)}>
      <img
        src={PlanetSvg}
        alt={`Year ${year}`}
        className="image"
      />
       <div className="year-text" style={{ color: 'red' }}>{year}</div>
 
    </div>
  ))}
</div>


        <img
         src={ArrowR}
          alt="Right Placeholder"
          className="placeholder right-placeholder"
          onClick={() => handlePlaceholderClick('next')} // 右侧占位图点击
        />
      </div>
      <div ref={detailsContainerRef} className="text-display-area">
        {selectedThesisDetails.map((detail, index) => (
          <div
            key={index}
            className="detail-block"
            onClick={() => window.open(detail.url, '_blank')}
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }} // 增加指针样式表明可点击
          >
            <p style={{ textAlign: 'left', margin: 0 }}>作者: {detail.author}</p>
            <p style={{ textAlign: 'left', margin: 0 }}>標题: {detail.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Thesis;
