import React, { useState } from 'react';
import ColorThief from 'colorthief';
import iconBrand from '../assets/icon/icon-brand.svg';

const Home = () => {
  // State
  const [selectedPath, setSelectedPath] = useState(null);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [backgroundPathColor, setBackgroundPathColor] = useState('#F89D21');
  const [upperOuterQuadColor, setUpperOuterQuadColor] = useState('#000000');
  const [upperInnerQuadColor, setUpperInnerQuadColor] = useState('#000000');
  const [lowerOuterQuadColor, setLowerOuterQuadColor] = useState('#000000');
  const [lowerInnerQuadColor, setLowerInnerQuadColor] = useState('#000000');

  // Functions
  const handleColorChange = (color) => {
    if (selectedPath) {
      setCurrentColor(color);
      updateColor(selectedPath, color);
    } else {
      setCurrentColor(color);
      setBackgroundPathColor(color);
    }
  };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setCurrentColor(
      path === 'upperOuterQuad' ? upperOuterQuadColor :
      path === 'upperInnerQuad' ? upperInnerQuadColor :
      path === 'lowerOuterQuad' ? lowerOuterQuadColor :
      path === 'lowerInnerQuad' ? lowerInnerQuadColor : '#000000'
    );
  };

  const updateColor = (path, color) => {
    switch (path) {
      case 'upperOuterQuad':
        setUpperOuterQuadColor(color);
        break;
      case 'upperInnerQuad':
        setUpperInnerQuadColor(color);
        break;
      case 'lowerOuterQuad':
        setLowerOuterQuadColor(color);
        break;
      case 'lowerInnerQuad':
        setLowerInnerQuadColor(color);
        break;
      default:
        break;
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();

      // Wait for image to load
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 6);
        // Set color palette for paths
        setUpperOuterQuadColor(`rgb(${colorPalette[0].join(', ')})`);
        setUpperInnerQuadColor(`rgb(${colorPalette[1].join(', ')})`);
        setLowerOuterQuadColor(`rgb(${colorPalette[2].join(', ')})`);
        setLowerInnerQuadColor(`rgb(${colorPalette[3].join(', ')})`);
        // Set background color
        setBackgroundPathColor(`rgb(${colorPalette[4].join(', ')})`);
        // Set default color
        setCurrentColor(`rgb(${colorPalette[5].join(', ')})`);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Color picker for all paths */}
      <input
        type="color"
        value={currentColor}
        style={{ backgroundColor: currentColor }}
        onChange={(e) => handleColorChange(e.target.value)}
      />

      {/* SVG with individually colored paths */}
      <svg width="400" height="400" viewBox="0 0 2400 2400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="2400" height="2400" fill={backgroundPathColor}/> 
        {/* Upper Outer Quad */}
        <path
          d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
          fill={selectedPath === 'upperOuterQuad' ? currentColor : upperOuterQuadColor}
          onClick={() => handlePathSelect('upperOuterQuad')}
        />
        {/* Upper Inner Quad */}
        <path
          d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
          fill={selectedPath === 'upperInnerQuad' ? currentColor : upperInnerQuadColor}
          onClick={() => handlePathSelect('upperInnerQuad')}
        />
        {/* Lower Outer Quad */}
        <path
          d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
          fill={selectedPath === 'lowerOuterQuad' ? currentColor : lowerOuterQuadColor}
          onClick={() => handlePathSelect('lowerOuterQuad')}
        />
        {/* Lower Inner Quad */}
        <path
          d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
          fill={selectedPath === 'lowerInnerQuad' ? currentColor : lowerInnerQuadColor}
          onClick={() => handlePathSelect('lowerInnerQuad')}
        />
      </svg>

      {/* Image Upload */}
      <input type="file" onChange={uploadImage} />
    </div>
  );
};

export default Home;
