import { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import NetworkMap from './components/NetworkMap';
import RoutingTable from './components/RoutingTable';
import Summary from './components/Summary';
import MapSelector from './components/MapSelector';
import SimulationControls from './components/SimulationControls';
import { findRoute } from './utils/routingAlgorithms';
import { getTopology, generateRandomTopology } from './utils/networkTopologies';
import './App.css';

function App() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const [currentHop, setCurrentHop] = useState(0);
  const [routeResult, setRouteResult] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [simulationConfig, setSimulationConfig] = useState(null);
  const [packetInfo, setPacketInfo] = useState(null);
  const [selectedMap, setSelectedMap] = useState('default');
  const [currentTopology, setCurrentTopology] = useState(getTopology('default'));
  const [simulationSpeed, setSimulationSpeed] = useState(2000);

  // Handle speed change
  const handleSpeedChange = (newSpeed) => {
    setSimulationSpeed(newSpeed);
  };

  // Handle map change
  const handleMapChange = (mapId) => {
    if (isSimulating) return;
    
    setSelectedMap(mapId);
    const newTopology = getTopology(mapId);
    setCurrentTopology(newTopology);
    
    // Reset simulation state
    setActivePath(null);
    setCurrentHop(0);
    setRouteResult(null);
    setShowSummary(false);
    setSimulationConfig(null);
    setPacketInfo(null);
  };

  // Handle random map generation
  const handleRandomMap = () => {
    if (isSimulating) return;
    
    const randomTopology = generateRandomTopology(6, 0.5); // 6 nodes, 50% density
    setSelectedMap('random');
    setCurrentTopology(randomTopology);
    
    // Reset simulation state
    setActivePath(null);
    setCurrentHop(0);
    setRouteResult(null);
    setShowSummary(false);
    setSimulationConfig(null);
    setPacketInfo(null);
  };

  // Handle simulation start
  const handleStartSimulation = (config) => {
    const { algorithm, source, destination } = config;
    
    // Find the route using the selected algorithm
    const result = findRoute(algorithm, source, destination, currentTopology);
    
    if (result.path.length === 0) {
      alert('No route found between selected routers!');
      return;
    }

    // Set up simulation state
    setSimulationConfig(config);
    setActivePath(result.path);
    setRouteResult({ ...result, algorithm, source, destination });
    setCurrentHop(0);
    setIsSimulating(true);
    setShowSummary(false);
  };

  // Animate packet movement through routers
  useEffect(() => {
    if (!isSimulating || !activePath) return;

    if (currentHop < activePath.length) {
      // Calculate delay for current hop
      let delay = 10; // Base delay
      if (currentHop > 0) {
        const connection = currentTopology.connections.find(
          conn => (conn.from === activePath[currentHop - 1] && conn.to === activePath[currentHop]) ||
                  (conn.to === activePath[currentHop - 1] && conn.from === activePath[currentHop])
        );
        delay = connection ? connection.delay : 10;
      }

      setPacketInfo({ delay, currentRouter: activePath[currentHop] });

      const timer = setTimeout(() => {
        setCurrentHop(prev => prev + 1);
      }, simulationSpeed);

      return () => clearTimeout(timer);
    } else {
      // Simulation complete
      setTimeout(() => {
        setIsSimulating(false);
        setShowSummary(true);
      }, 1000);
    }
  }, [currentHop, isSimulating, activePath, simulationSpeed]);

  // Reset simulation
  const handleReset = () => {
    setIsSimulating(false);
    setActivePath(null);
    setCurrentHop(0);
    setRouteResult(null);
    setShowSummary(false);
    setSimulationConfig(null);
    setPacketInfo(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌐 Internet Routing Visualizer</h1>
        <p>Watch how data packets travel through networks using different routing algorithms</p>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <MapSelector
            selectedMap={selectedMap}
            onMapChange={handleMapChange}
            onRandomMap={handleRandomMap}
            isSimulating={isSimulating}
          />
          
          <ControlPanel 
            onStartSimulation={handleStartSimulation}
            isSimulating={isSimulating}
            topology={currentTopology}
          />

          <SimulationControls
            isSimulating={isSimulating}
            onSpeedChange={handleSpeedChange}
            currentSpeed={simulationSpeed}
          />
        </aside>

        <main className="main-content">
          <NetworkMap
            activePath={activePath}
            currentHop={currentHop}
            isSimulating={isSimulating}
            packetInfo={packetInfo}
            topology={currentTopology}
            simulationSpeed={simulationSpeed}
          />

          <RoutingTable
            currentRouter={activePath ? activePath[currentHop] : null}
            algorithm={simulationConfig?.algorithm}
            activePath={activePath}
            currentHop={currentHop}
            topology={currentTopology}
          />
        </main>
      </div>

      {showSummary && (
        <Summary result={routeResult} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
