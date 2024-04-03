import React, { useRef, useState, useEffect } from 'react';
import './Thesis.css';
import thesisData from './Thesis.json';
import PlanetW from './img/PlanetW.svg'; // 默认的星球图标
import PlanetB from './img/PlanetB.svg'; // 点击后的星球图标

// 导入左箭头的所有状态
import ArrowL from './img/ArrowL.svg'; // 默认
import ArrowL_A from './img/ArrowL_A.svg'; // 激活
import ArrowL_D from './img/ArrowL_D.svg'; // 禁用
// 导入右箭头的所有状态
import ArrowR from './img/ArrowR.svg'; // 默认
import ArrowR_A from './img/ArrowR_A.svg'; // 激活
import ArrowR_D from './img/ArrowR_D.svg'; // 禁用
function Thesis({ height }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedThesisDetails, setSelectedThesisDetails] = useState([]);
  const imageContainerRef = useRef(null);
  const detailsContainerRef = useRef(null); // 新增一个ref用于详细信息的容器
  const [isLeftActive, setIsLeftActive] = useState(false); // 新状态：左箭头是否激活
  const [isRightActive, setIsRightActive] = useState(false); // 新状态：右箭头是否激活
  
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
    // 动态获取imageContainer的实际宽度
    const containerWidth = imageContainerRef.current.offsetWidth;

    // 假设所有按钮都有相同的宽度，这里通过获取第一个按钮的宽度作为所有按钮的宽度
    // 如果按钮宽度不一致，您可能需要根据每个按钮动态计算
    const buttonWidth = imageContainerRef.current.children[0].offsetWidth;

    // 计算应该滚动的距离，以使被点击的按钮尽可能地居中
    // 这里我们需要计算所有到达被点击按钮之前的按钮的总宽度，然后调整滚动距离
    let totalWidthBeforeClickedButton = 0;
    for (let i = 0; i < index; i++) {
      totalWidthBeforeClickedButton += imageContainerRef.current.children[i].offsetWidth;
    }

    // 使被点击的按钮居中，需要考虑到容器宽度的一半减去按钮宽度的一半
    const scrollX = totalWidthBeforeClickedButton - (containerWidth / 2) + (buttonWidth / 2);

    imageContainerRef.current.scroll({
      left: scrollX,
      behavior: 'smooth',
    });
    setSelectedYear(year);
    const selectedDetails = thesisData[0].filter(item => item.year === year);
    setSelectedThesisDetails(selectedDetails);
    setIsDisabled(false); // 重置禁用状态，因为点击了有效年份
    setClickedDirection(null); // 可选：清除方向状态，如果你不需要在UI中反映点击的箭头方向
    setIsLeftClicked(false); // 重置左箭头点击状态
    setIsRightClicked(false); // 重置右箭头点击状态
  };


  const handlePlaceholderClick = (direction) => {
    if (!selectedYear) return; // 如果还没有选中任何年份，不做任何操作

    const currentIndex = years.findIndex(year => year === selectedYear);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    // 确保索引在有效范围内
    if (newIndex >= 0 && newIndex < years.length) {
      const newYear = years[newIndex];
      handleClick(newYear, newIndex);
      setClickedDirection(direction); // 更新点击的方向
    } else {
      // 如果已经在列表的边界，禁用对应方向的箭头
      setIsDisabled(true);
      setClickedDirection(direction);
    }
    if (direction === 'prev') {
      setIsLeftClicked(true);
      setIsRightClicked(false); // 重置右箭头，以确保只有一个箭头显示为点击状态
    } else if (direction === 'next') {
      setIsRightClicked(true);
      setIsLeftClicked(false); // 重置左箭头
    }
  };

  const isPrevDisabled = selectedYear === years[0]; // 如果当前选中的是第一个年份，则禁用“上一个”
  const isNextDisabled = selectedYear === years[years.length - 1]; // 如果当前选中的是最后一个年份，则禁用“下一个”
  const resetActiveStates = () => {
    setIsLeftActive(false);
    setIsRightActive(false);
  };
  const handleMouseDown = (direction) => {
    if (direction === 'prev' && !isPrevDisabled) {
      setIsLeftActive(true);
    } else if (direction === 'next' && !isNextDisabled) {
      setIsRightActive(true);
    }
  };
  
  return (
    <div id="thesis" style={{ height }}>
      <div className="images-row">
      <img
          src={isPrevDisabled ? ArrowL_D : (isLeftActive ? ArrowL_A : ArrowL)}
          alt="Left Placeholder"
          className="arrow-left" // 确保有正确的类名
          onMouseDown={() => handleMouseDown('prev')}
          onMouseUp={resetActiveStates}
          onMouseLeave={resetActiveStates}
          onClick={!isPrevDisabled ? () => handlePlaceholderClick('prev') : undefined}
        />
        <div ref={imageContainerRef} className="image-container">
          {years.map((year, index) => (
            <div
              key={index}
              className={`year-container ${selectedYear === year ? 'selected' : ''}`}
              onClick={() => handleClick(year, index)}
            >
              <img
                src={selectedYear === year ? PlanetB : PlanetW}
                alt={`Year ${year}`}
                className="image"
              />
              <div
                className="year-text"
                style={{ color: selectedYear === year ? '#FFFFFF' : "#7EC0FC" }}
              >
                {year}
              </div>
            </div>
          ))}
        </div>

        <img
          src={isNextDisabled ? ArrowR_D : (isRightActive ? ArrowR_A : ArrowR)}
          alt="Right Placeholder"
          className="arrow-right" // 确保有正确的类名
          onMouseDown={() => handleMouseDown('next')}
          onMouseUp={resetActiveStates}
          onMouseLeave={resetActiveStates}
          onClick={!isNextDisabled ? () => handlePlaceholderClick('next') : undefined}
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
