import { useState, useEffect } from 'react';
import './PacketAnimation.css';

function PacketAnimation({ path, currentHop, routers, packetInfo, simulationSpeed }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(true);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (currentHop < path.length) {
      const currentRouter = routers.find(r => r.id === path[currentHop]);
      if (currentRouter) {
        // Add current position to trail
        setTrail(prev => [...prev.slice(-3), { x: currentRouter.x, y: currentRouter.y, key: Date.now() }]);
        
        setPosition({ x: currentRouter.x, y: currentRouter.y });
        setShowTooltip(true);
        
        // Hide tooltip after 1.5 seconds
        const timer = setTimeout(() => setShowTooltip(false), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentHop, path, routers]);

  if (currentHop >= path.length) return null;

  const nextHop = currentHop < path.length - 1 ? path[currentHop + 1] : null;

  return (
    <g className="packet-animation">
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <circle
          key={pos.key || index}
          cx={pos.x}
          cy={pos.y}
          r={6 - index}
          className="packet-trail"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
      
      {/* Glowing outer circle */}
      <circle
        cx={position.x}
        cy={position.y}
        r="14"
        className="packet-glow"
      />
      
      {/* Main packet */}
      <circle
        cx={position.x}
        cy={position.y}
        r="9"
        className="packet"
      />

      {/* Enhanced Tooltip */}
      {showTooltip && packetInfo && (
        <g className="packet-tooltip">
          <rect
            x={position.x - 90}
            y={position.y - 55}
            width="180"
            height="42"
            rx="8"
            className="tooltip-bg"
          />
          <text
            x={position.x}
            y={position.y - 38}
            textAnchor="middle"
            className="tooltip-text"
            fontSize="12"
            fontWeight="700"
            fill="#58a6ff"
          >
            📦 Hop {currentHop + 1} of {path.length}
          </text>
          <text
            x={position.x}
            y={position.y - 23}
            textAnchor="middle"
            className="tooltip-text"
            fontSize="10"
            fill="#8b949e"
          >
            ⏱️ Delay: {packetInfo.delay}ms | 📍 At {packetInfo.currentRouter}
          </text>
        </g>
      )}
    </g>
  );
}

export default PacketAnimation;
