import React, { useState, useEffect } from 'react';
import './Album.css';
import albumData from './album.json';

const Album = ({ height }) => {
  const [photos, setPhotos] = useState([]);
  const [expandedPhotoId, setExpandedPhotoId] = useState(null);

  useEffect(() => {
    setPhotos([...albumData]);
  }, []);

  const handleImageClick = (id) => {
    if (expandedPhotoId === id) {
      setExpandedPhotoId(null); // 如果点击的是已展开的图片，则关闭
    } else {
      setExpandedPhotoId(id); // 否则，展开被点击的图片
    }
  };

  return (
    <div id="album" style={{ height, backgroundColor: 'peachpuff', padding: '20px', overflowX: 'scroll', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="photos">
        {photos.map((photo) => (
          <div className={`photo-container ${expandedPhotoId === photo.id ? 'expanded' : ''}`} key={photo.id} onClick={() => handleImageClick(photo.id)}>
            <img
              src={photo.url}
              alt={photo.id === 'blank' ? 'Transparent Placeholder' : `Photo ${photo.id}`}
              className={expandedPhotoId === photo.id ? 'expanded' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
