import { getTopologyNames } from '../utils/networkTopologies';
import './MapSelector.css';

function MapSelector({ selectedMap, onMapChange, onRandomMap, isSimulating }) {
  const topologies = getTopologyNames();

  return (
    <div className="map-selector">
      <h3>🔷 Network Topology</h3>
      <select 
        value={selectedMap} 
        onChange={(e) => onMapChange(e.target.value)}
        disabled={isSimulating}
        className="map-select"
      >
        {topologies.map(topo => (
          <option key={topo.id} value={topo.id}>
            {topo.name}
          </option>
        ))}
      </select>
      <p className="map-description">
        {selectedMap === 'random' 
          ? 'Randomly generated topology'
          : topologies.find(t => t.id === selectedMap)?.description
        }
      </p>
      
      <button 
        className="random-map-button"
        onClick={onRandomMap}
        disabled={isSimulating}
      >
        🎲 Generate Random Map
      </button>
    </div>
  );
}

export default MapSelector;
