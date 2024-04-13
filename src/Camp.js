import React, { useState, useEffect } from 'react';
import './Camp.css';
import CampData from './Camp.json';

const Camp = () => {
  const [photos, setPhotos] = useState([]);
  const [expandedPhotoId, setExpandedPhotoId] = useState(4);
  const [showTextPhotoId, setShowTextPhotoId] = useState(4);

  useEffect(() => {
    setPhotos([...CampData]);
  }, []);

  const handleImageClick = (id) => {
    if (expandedPhotoId === id) {
      setExpandedPhotoId(null); // 如果点击的是已展开的图片，则关闭
    } else {
      setExpandedPhotoId(id); // 否则，展开被点击的图片
    }

    // Use setTimeout to simulate a delayed action
    setTimeout(() => {
      if (showTextPhotoId === id) {
        setShowTextPhotoId(null); // 如果点击的是已展开的图片，则关闭
      } else {
        setShowTextPhotoId(id); // 否则，展开被点击的图片
      }
    }, 500);
  };

  return (
    <div id="camp">
      <div className='container'>
        <div className="photos">
          {photos.map((photo) => (
            <div className={`photo-container ${expandedPhotoId === photo.id ? 'expanded' : ''} ${showTextPhotoId === photo.id ? 'showText' : ''}`} key={photo.id} onClick={() => handleImageClick(photo.id)}>
              <div className='photo-box'>
                <img
                  src={photo.url}
                  alt={photo.id === 'blank' ? 'Transparent Placeholder' : `Photo ${photo.id}`}
                  className={expandedPhotoId === photo.id ? 'expanded' : ''}
                />
                <div className='text'>
                  <h4>{photo.name}</h4>
                  <p>{photo.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Camp;
