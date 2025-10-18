import { useState } from 'react';
import './SimulationControls.css';

function SimulationControls({ isSimulating, onSpeedChange, currentSpeed }) {
  const [speed, setSpeed] = useState(currentSpeed || 2000);

  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  const speedLabel = () => {
    if (speed >= 3000) return 'Slow';
    if (speed >= 1500) return 'Normal';
    if (speed >= 800) return 'Fast';
    return 'Very Fast';
  };

  return (
    <div className="simulation-controls">
      <div className="controls-header">
        <span className="controls-icon">⏱️</span>
        <h4>Simulation Speed</h4>
      </div>
      {!isSimulating && <div className="simulation-paused">Start simulation to adjust speed</div>}
      
      <div className="speed-control">
        <label className="speed-label">
          <span className="speed-icon">🐢</span>
          <input
            type="range"
            min="500"
            max="4000"
            step="100"
            value={speed}
            onChange={handleSpeedChange}
            className="speed-slider"
          />
          <span className="speed-icon">🚀</span>
        </label>
        <div className="speed-display">
          <span className="speed-value">{speedLabel()}</span>
          <span className="speed-ms">{speed}ms per hop</span>
        </div>
      </div>

      <div className="simulation-status">
        <div className="status-indicator pulsing"></div>
        <span>Simulation Running...</span>
      </div>
    </div>
  );
}

export default SimulationControls;
