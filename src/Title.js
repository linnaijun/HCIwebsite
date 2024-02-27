import React from 'react';

function Title({ height }) {
  return (
    <div id="title" style={{ height, backgroundColor: 'lightgray', padding: '20px' }}>
      <h1>標題</h1>
    </div>
  );
}

export default Title;
