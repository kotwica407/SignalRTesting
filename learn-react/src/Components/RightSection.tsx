import React from 'react';
import UpperPart from './UpperPart';
import LowerPart from './LowerPart';
import './RightSection.css'; // CSS for styling

const RightSection: React.FC = () => {
  return (
    <div className="right-section-container">
      <UpperPart />
      <LowerPart />
    </div>
  );
};

export default RightSection;
