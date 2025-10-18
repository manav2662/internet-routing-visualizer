import { useState, useEffect } from 'react';
import './ControlPanel.css';

function ControlPanel({ onStartSimulation, isSimulating, topology }) {
  const [algorithm, setAlgorithm] = useState('OSPF');
  const [source, setSource] = useState('R1');
  const [destination, setDestination] = useState('R6');

  const routers = topology.routers.map(r => r.id);
  const algorithms = ['RIP', 'OSPF', 'BGP'];

  // Reset source and destination when topology changes
  useEffect(() => {
    if (routers.length > 0) {
      setSource(routers[0]);
      setDestination(routers[routers.length - 1]);
    }
  }, [topology]);

  const handleStart = () => {
    if (source === destination) {
      alert('Source and destination must be different!');
      return;
    }
    onStartSimulation({ algorithm, source, destination });
  };

  return (
    <div className="control-panel">
      <h2>⚙️ Control Panel</h2>
      
      <div className="control-section">
        <label>
          <span className="label-icon">🔄</span>
          Routing Algorithm
        </label>
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSimulating}
          className="control-select"
        >
          {algorithms.map(alg => (
            <option key={alg} value={alg}>{alg}</option>
          ))}
        </select>
        <div className="algorithm-info">
          {algorithm === 'RIP' && '📈 Distance Vector - Hop count based'}
          {algorithm === 'OSPF' && '🔗 Link State - Shortest path first'}
          {algorithm === 'BGP' && '🌐 Path Vector - Policy based'}
        </div>
      </div>

      <div className="control-section">
        <label>
          <span className="label-icon">🟢</span>
          Source Router
        </label>
        <select 
          value={source} 
          onChange={(e) => setSource(e.target.value)}
          disabled={isSimulating}
          className="control-select"
        >
          {routers.map(router => (
            <option key={router} value={router}>{router}</option>
          ))}
        </select>
      </div>

      <div className="control-section">
        <label>
          <span className="label-icon">🔴</span>
          Destination Router
        </label>
        <select 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)}
          disabled={isSimulating}
          className="control-select"
        >
          {routers.map(router => (
            <option key={router} value={router}>{router}</option>
          ))}
        </select>
      </div>

      <button 
        className="start-button" 
        onClick={handleStart}
        disabled={isSimulating}
      >
        {isSimulating ? '⏳ Simulating...' : '▶️ Start Simulation'}
      </button>

      <div className="info-box">
        <h3>💡 How it works</h3>
        <p>Select a routing algorithm, source, and destination router. Click start to watch the packet travel through the network!</p>
      </div>
    </div>
  );
}

export default ControlPanel;
