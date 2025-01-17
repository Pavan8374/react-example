// src/components/Spinner.tsx
import React from 'react';
import '../styles/spinner.css'; // Ensure this line is present to import the styles
import { ThreeDots } from 'react-loader-spinner'; // Import the desired spinner

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#3498db" // Customize the color as needed
        ariaLabel="three-dots-loading"
        visible={true} 
      />
    </div>
  );
};

export default Spinner;
