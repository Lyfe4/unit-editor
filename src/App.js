import React, { useState } from 'react';
import UnitEditor from './components/UnitEditor';
import UnitListing from './components/UnitListing';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('listing');
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Handle navigation to editor when a unit is selected
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setCurrentView('editor');
  };

  // Handle navigation back to listing
  const handleBackToUnits = () => {
    setCurrentView('listing');
  };

  return (
    <div className="App">
      {currentView === 'listing' ? (
        <UnitListing onUnitSelect={handleUnitSelect} />
      ) : (
        <UnitEditor unit={selectedUnit} onBackClick={handleBackToUnits} />
      )}
    </div>
  );
}

export default App;