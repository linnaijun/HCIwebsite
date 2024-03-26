import React, { useRef, useState, useEffect } from 'react';
import './Thesis.css';
import thesisData from './Thesis.json';

function Thesis({ height }) {
  const [years, setYears] = useState([]);
  const [selectedThesisDetails, setSelectedThesisDetails] = useState([]);
  const imageContainerRef = useRef(null);
  const detailsContainerRef = useRef(null); // 新增一个ref用于详细信息的容器

  useEffect(() => {
    const uniqueYears = Array.from(new Set(thesisData[0].map(item => item.year)))
                             .sort((a, b) => b - a);
    setYears(uniqueYears);
  }, []);

  const handleClick = (year, index) => {
    // 根据索引滚动
    const scrollX = (index - 2) * 200;
    imageContainerRef.current.scroll({
      left: scrollX,
      behavior: 'smooth',
    });

    // 根据年份更新详细信息
    const selectedDetails = thesisData[0].filter(item => item.year === year);
    setSelectedThesisDetails(selectedDetails);

    // 如果需要，也可以在这里添加滚动到详细信息容器的逻辑
  };

  return (
    <div id="thesis" style={{ height }}>
      <div ref={imageContainerRef} className="image-container">
        {years.map((year, index) => (
          <img key={index} 
               src={`https://via.placeholder.com/200x200/${Math.floor(Math.random()*16777215).toString(16)}/fff?text=${year}`} 
               alt={`Year ${year}`} 
               className="image" 
               onClick={() => handleClick(year, index)} />
        ))}
      </div>
      <div ref={detailsContainerRef} className="text-display-area">
        {selectedThesisDetails.map((detail, index) => (
          <div key={index}>
            <p>作者: {detail.author}</p>
            <p>标题: {detail.title}</p>
            <p>年份: {detail.year}</p>
            <p>指导教授: {detail.professor1} {detail.professor2 ? `, ${detail.professor2}` : ''}</p>
            <a href={detail.url} target="_blank" rel="noopener noreferrer">论文链接</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Thesis;
