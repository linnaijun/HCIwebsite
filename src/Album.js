import React, { useState, useEffect, useRef } from 'react';

function Album({ height }) {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [photoSizes, setPhotoSizes] = useState({});
  const [centerImageId, setCenterImageId] = useState(null);
  const albumRef = useRef(null); // 新增：使用 useRef 来引用相册的 DOM 元素
  const photos = [
    { id: 1, url: 'https://i.pinimg.com/564x/24/ad/eb/24adeb1d55d117e4bd9461ab08aa66d8.jpg' },
    { id: 2, url: 'https://i.pinimg.com/564x/a4/dd/69/a4dd69d5a5ac58403f86cf0543402900.jpg' },
    { id: 3, url: 'https://i.pinimg.com/564x/97/41/55/974155ea70c5fe51ef0010c3b0bfa67e.jpg' },
    { id: 4, url: 'https://i.pinimg.com/564x/3a/00/2d/3a002db8afce64e58c9cdf7393f4a724.jpg' },
    { id: 5, url: 'https://i.pinimg.com/564x/4a/b6/94/4ab694b996368f8fb83ef264cf3306b8.jpg' },
  ];

  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
      img.onload = () => {
        const scale = 200 / img.width;
        setPhotoSizes(prevSizes => ({
          ...prevSizes,
          [photo.id]: { width: img.width * scale, height: img.height * scale, scale }
        }));
      };
    });
  }, []);

  const getImageStyle = (id) => {
    const size = photoSizes[id];
    if (!size) return { display: 'none' };

    const isSelected = id === selectedImageId;
    const scale = isSelected ? 1.5 : 1;
    return {
      width: `${size.width}px`,
      height: `${size.height}px`,
      transform: `scale(${scale})`,
      transition: 'transform 0.5s ease',
      cursor: 'pointer',
    };
  };

  const getContainerStyle = () => {
    if (centerImageId !== null && albumRef.current) {
      const albumWidth = albumRef.current.offsetWidth; // 相册容器的宽度
      const imageIndex = photos.findIndex(photo => photo.id === centerImageId);
      const imageWidth = photoSizes[centerImageId]?.width || 0; // 被点击图片的原始宽度
      const offset = imageIndex * (imageWidth + 10); // 假设每张图片间隔为10px
      const halfImageWidth = (imageWidth * 1.5) / 2; // 被点击图片放大后的一半宽度
      const centerOffset = albumWidth/4 - halfImageWidth; // 调整值，使被点击图片居中

      return {
        display: 'flex',
        justifyContent: 'flex-start',
        transform: `translateX(${centerOffset - offset}px)`,
        transition: 'transform 0.5s ease',
      };
    }
    return { display: 'flex', justifyContent: 'flex-start' };
  };

  return (
    <div id="album" ref={albumRef} style={{ height, backgroundColor: 'peachpuff', padding: '20px', overflowX: 'scroll', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={getContainerStyle()}>
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.url}
            alt={`Photo ${photo.id}`}
            style={getImageStyle(photo.id)}
            onClick={() => {
              setSelectedImageId(photo.id === selectedImageId ? null : photo.id);
              setCenterImageId(photo.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
