import PacketAnimation from './PacketAnimation';
import './NetworkMap.css';

function NetworkMap({ activePath, currentHop, isSimulating, packetInfo, topology, simulationSpeed }) {
  const { routers, connections } = topology;

  // Check if a connection is part of the active path
  const isConnectionActive = (from, to) => {
    if (!activePath || activePath.length < 2) return false;
    
    for (let i = 0; i < activePath.length - 1; i++) {
      if ((activePath[i] === from && activePath[i + 1] === to) ||
          (activePath[i] === to && activePath[i + 1] === from)) {
        return true;
      }
    }
    return false;
  };

  // Check if router is active (current hop or visited)
  const getRouterStatus = (routerId) => {
    if (!activePath) return 'inactive';
    
    const index = activePath.indexOf(routerId);
    if (index === -1) return 'inactive';
    if (index < currentHop) return 'visited';
    if (index === currentHop) return 'current';
    return 'upcoming';
  };

  return (
    <div className="network-map">
      <svg width="900" height="400" className="network-svg">
        {/* Draw connections first (so they appear behind routers) */}
        {connections.map((conn, idx) => {
          const fromRouter = routers.find(r => r.id === conn.from);
          const toRouter = routers.find(r => r.id === conn.to);
          const isActive = isConnectionActive(conn.from, conn.to);
          
          return (
            <g key={idx}>
              <line
                x1={fromRouter.x}
                y1={fromRouter.y}
                x2={toRouter.x}
                y2={toRouter.y}
                className={`connection ${isActive ? 'active' : ''}`}
                strokeWidth="3"
              />
              {/* Connection label */}
              <text
                x={(fromRouter.x + toRouter.x) / 2}
                y={(fromRouter.y + toRouter.y) / 2 - 10}
                className="connection-label"
                fontSize="11"
                fill="#888"
              >
                {conn.cost}
              </text>
            </g>
          );
        })}

        {/* Draw routers */}
        {routers.map(router => {
          const status = getRouterStatus(router.id);
          
          return (
            <g key={router.id}>
              <circle
                cx={router.x}
                cy={router.y}
                r="30"
                className={`router ${status}`}
              />
              <text
                x={router.x}
                y={router.y + 5}
                className="router-label"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
              >
                {router.id}
              </text>
              <text
                x={router.x}
                y={router.y + 50}
                className="router-name"
                textAnchor="middle"
                fontSize="11"
              >
                {router.label}
              </text>
            </g>
          );
        })}

        {/* Packet animation */}
        {isSimulating && activePath && activePath.length > 1 && (
          <PacketAnimation
            path={activePath}
            currentHop={currentHop}
            routers={routers}
            packetInfo={packetInfo}
            simulationSpeed={simulationSpeed}
          />
        )}
      </svg>
    </div>
  );
}

export default NetworkMap;
