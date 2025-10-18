// Collection of predefined network topologies

export const networkTopologies = {
  default: {
    name: "Default Network",
    description: "Balanced mesh topology",
    routers: [
      { id: 'R1', x: 150, y: 200, label: 'Router 1' },
      { id: 'R2', x: 350, y: 100, label: 'Router 2' },
      { id: 'R3', x: 350, y: 300, label: 'Router 3' },
      { id: 'R4', x: 550, y: 100, label: 'Router 4' },
      { id: 'R5', x: 550, y: 300, label: 'Router 5' },
      { id: 'R6', x: 750, y: 200, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 10 },
      { from: 'R1', to: 'R3', cost: 2, delay: 15 },
      { from: 'R2', to: 'R3', cost: 1, delay: 8 },
      { from: 'R2', to: 'R4', cost: 3, delay: 20 },
      { from: 'R3', to: 'R5', cost: 1, delay: 12 },
      { from: 'R4', to: 'R5', cost: 1, delay: 10 },
      { from: 'R4', to: 'R6', cost: 2, delay: 18 },
      { from: 'R5', to: 'R6', cost: 1, delay: 10 }
    ]
  },

  star: {
    name: "Star Network",
    description: "Central hub topology",
    routers: [
      { id: 'R1', x: 450, y: 200, label: 'Router 1 (Hub)' },
      { id: 'R2', x: 250, y: 100, label: 'Router 2' },
      { id: 'R3', x: 650, y: 100, label: 'Router 3' },
      { id: 'R4', x: 250, y: 300, label: 'Router 4' },
      { id: 'R5', x: 650, y: 300, label: 'Router 5' },
      { id: 'R6', x: 450, y: 50, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 10 },
      { from: 'R1', to: 'R3', cost: 1, delay: 10 },
      { from: 'R1', to: 'R4', cost: 1, delay: 10 },
      { from: 'R1', to: 'R5', cost: 1, delay: 10 },
      { from: 'R1', to: 'R6', cost: 1, delay: 10 }
    ]
  },

  ring: {
    name: "Ring Network",
    description: "Circular topology",
    routers: [
      { id: 'R1', x: 450, y: 50, label: 'Router 1' },
      { id: 'R2', x: 650, y: 125, label: 'Router 2' },
      { id: 'R3', x: 650, y: 275, label: 'Router 3' },
      { id: 'R4', x: 450, y: 350, label: 'Router 4' },
      { id: 'R5', x: 250, y: 275, label: 'Router 5' },
      { id: 'R6', x: 250, y: 125, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 12 },
      { from: 'R2', to: 'R3', cost: 1, delay: 12 },
      { from: 'R3', to: 'R4', cost: 1, delay: 12 },
      { from: 'R4', to: 'R5', cost: 1, delay: 12 },
      { from: 'R5', to: 'R6', cost: 1, delay: 12 },
      { from: 'R6', to: 'R1', cost: 1, delay: 12 }
    ]
  },

  mesh: {
    name: "Mesh Network",
    description: "Fully connected topology",
    routers: [
      { id: 'R1', x: 200, y: 100, label: 'Router 1' },
      { id: 'R2', x: 450, y: 100, label: 'Router 2' },
      { id: 'R3', x: 700, y: 100, label: 'Router 3' },
      { id: 'R4', x: 200, y: 300, label: 'Router 4' },
      { id: 'R5', x: 450, y: 300, label: 'Router 5' },
      { id: 'R6', x: 700, y: 300, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 10 },
      { from: 'R1', to: 'R4', cost: 1, delay: 10 },
      { from: 'R1', to: 'R5', cost: 2, delay: 15 },
      { from: 'R2', to: 'R3', cost: 1, delay: 10 },
      { from: 'R2', to: 'R4', cost: 2, delay: 15 },
      { from: 'R2', to: 'R5', cost: 1, delay: 10 },
      { from: 'R2', to: 'R6', cost: 2, delay: 15 },
      { from: 'R3', to: 'R5', cost: 2, delay: 15 },
      { from: 'R3', to: 'R6', cost: 1, delay: 10 },
      { from: 'R4', to: 'R5', cost: 1, delay: 10 },
      { from: 'R5', to: 'R6', cost: 1, delay: 10 }
    ]
  },

  tree: {
    name: "Tree Network",
    description: "Hierarchical topology",
    routers: [
      { id: 'R1', x: 450, y: 50, label: 'Router 1 (Root)' },
      { id: 'R2', x: 300, y: 150, label: 'Router 2' },
      { id: 'R3', x: 600, y: 150, label: 'Router 3' },
      { id: 'R4', x: 200, y: 250, label: 'Router 4' },
      { id: 'R5', x: 400, y: 250, label: 'Router 5' },
      { id: 'R6', x: 700, y: 250, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 10 },
      { from: 'R1', to: 'R3', cost: 1, delay: 10 },
      { from: 'R2', to: 'R4', cost: 1, delay: 12 },
      { from: 'R2', to: 'R5', cost: 1, delay: 12 },
      { from: 'R3', to: 'R6', cost: 1, delay: 12 }
    ]
  },

  linear: {
    name: "Linear Network",
    description: "Sequential chain topology",
    routers: [
      { id: 'R1', x: 100, y: 200, label: 'Router 1' },
      { id: 'R2', x: 250, y: 200, label: 'Router 2' },
      { id: 'R3', x: 400, y: 200, label: 'Router 3' },
      { id: 'R4', x: 550, y: 200, label: 'Router 4' },
      { id: 'R5', x: 700, y: 200, label: 'Router 5' },
      { id: 'R6', x: 850, y: 200, label: 'Router 6' }
    ],
    connections: [
      { from: 'R1', to: 'R2', cost: 1, delay: 10 },
      { from: 'R2', to: 'R3', cost: 1, delay: 10 },
      { from: 'R3', to: 'R4', cost: 1, delay: 10 },
      { from: 'R4', to: 'R5', cost: 1, delay: 10 },
      { from: 'R5', to: 'R6', cost: 1, delay: 10 }
    ]
  }
};

// Get list of all topology names for dropdown
export const getTopologyNames = () => {
  return Object.keys(networkTopologies).map(key => ({
    id: key,
    name: networkTopologies[key].name,
    description: networkTopologies[key].description
  }));
};

// Get specific topology by ID
export const getTopology = (topologyId) => {
  return networkTopologies[topologyId] || networkTopologies.default;
};

// Generate random network topology
export const generateRandomTopology = (nodeCount = 6, density = 0.4) => {
  const routers = [];
  const connections = [];
  
  // Generate random router positions (avoid overlapping)
  const minDistance = 120; // Minimum distance between routers
  const padding = 100;
  const maxX = 800;
  const maxY = 350;
  
  for (let i = 0; i < nodeCount; i++) {
    let x, y, attempts = 0;
    let validPosition = false;
    
    // Try to find a non-overlapping position
    while (!validPosition && attempts < 50) {
      x = padding + Math.random() * (maxX - 2 * padding);
      y = padding + Math.random() * (maxY - 2 * padding);
      
      validPosition = true;
      for (const router of routers) {
        const distance = Math.sqrt(Math.pow(x - router.x, 2) + Math.pow(y - router.y, 2));
        if (distance < minDistance) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }
    
    routers.push({
      id: `R${i + 1}`,
      x: Math.round(x),
      y: Math.round(y),
      label: `Router ${i + 1}`
    });
  }
  
  // Generate random connections based on density
  const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
  const targetConnections = Math.floor(maxConnections * density);
  const connectedPairs = new Set();
  
  // Ensure minimum connectivity (spanning tree)
  for (let i = 1; i < nodeCount; i++) {
    const from = routers[i].id;
    const to = routers[Math.floor(Math.random() * i)].id;
    const pairKey = [from, to].sort().join('-');
    
    connectedPairs.add(pairKey);
    connections.push({
      from,
      to,
      cost: Math.floor(Math.random() * 5) + 1, // 1-5
      delay: Math.floor(Math.random() * 15) + 8 // 8-22ms
    });
  }
  
  // Add additional random connections to reach target density
  let attempts = 0;
  while (connections.length < targetConnections && attempts < 100) {
    const i = Math.floor(Math.random() * nodeCount);
    const j = Math.floor(Math.random() * nodeCount);
    
    if (i !== j) {
      const from = routers[i].id;
      const to = routers[j].id;
      const pairKey = [from, to].sort().join('-');
      
      if (!connectedPairs.has(pairKey)) {
        connectedPairs.add(pairKey);
        connections.push({
          from,
          to,
          cost: Math.floor(Math.random() * 5) + 1,
          delay: Math.floor(Math.random() * 15) + 8
        });
      }
    }
    attempts++;
  }
  
  return {
    name: "Random Network",
    description: `Randomly generated with ${nodeCount} nodes`,
    routers,
    connections
  };
};
