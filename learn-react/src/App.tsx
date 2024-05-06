import React from 'react';
import './App.css';
import LeftSidebar from './Components/LeftSideBar';
import RightSection from './Components/RightSection';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <LeftSidebar />
      </div>
      <div className="right-content">
        <RightSection />
      </div>
    </div>
  );
};

export default App;