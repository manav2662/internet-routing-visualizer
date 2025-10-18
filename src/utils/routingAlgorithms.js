// Build adjacency list from connections
function buildGraph(topology) {
  const graph = {};
  topology.routers.forEach(router => {
    graph[router.id] = [];
  });
  
  topology.connections.forEach(conn => {
    graph[conn.from].push({ node: conn.to, cost: conn.cost, delay: conn.delay });
    graph[conn.to].push({ node: conn.from, cost: conn.cost, delay: conn.delay });
  });
  
  return graph;
}

// Dijkstra's algorithm (used for OSPF)
function dijkstra(graph, start, end, topology) {
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  
  topology.routers.forEach(router => {
    distances[router.id] = Infinity;
    previous[router.id] = null;
    unvisited.add(router.id);
  });
  
  distances[start] = 0;
  
  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;
    
    unvisited.forEach(node => {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    });
    
    if (current === null || current === end) break;
    
    unvisited.delete(current);
    
    graph[current].forEach(neighbor => {
      if (unvisited.has(neighbor.node)) {
        const alt = distances[current] + neighbor.cost;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = current;
        }
      }
    });
  }
  
  // Reconstruct path
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}

// Bellman-Ford algorithm (used for RIP)
function bellmanFord(graph, start, end, topology) {
  const distances = {};
  const previous = {};
  
  topology.routers.forEach(router => {
    distances[router.id] = Infinity;
    previous[router.id] = null;
  });
  
  distances[start] = 0;
  
  // Relax edges repeatedly
  for (let i = 0; i < topology.routers.length - 1; i++) {
    topology.connections.forEach(conn => {
      // Forward direction
      if (distances[conn.from] + conn.cost < distances[conn.to]) {
        distances[conn.to] = distances[conn.from] + conn.cost;
        previous[conn.to] = conn.from;
      }
      // Backward direction
      if (distances[conn.to] + conn.cost < distances[conn.from]) {
        distances[conn.from] = distances[conn.to] + conn.cost;
        previous[conn.from] = conn.to;
      }
    });
  }
  
  // Reconstruct path
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}

// BGP-like algorithm (policy-based, prefers certain paths)
function bgpRouting(graph, start, end, topology) {
  // For simplicity, BGP will prefer paths with fewer AS hops
  // We'll use a modified Dijkstra that considers hop count more than cost
  const distances = {};
  const hopCount = {};
  const previous = {};
  const unvisited = new Set();
  
  topology.routers.forEach(router => {
    distances[router.id] = Infinity;
    hopCount[router.id] = Infinity;
    previous[router.id] = null;
    unvisited.add(router.id);
  });
  
  distances[start] = 0;
  hopCount[start] = 0;
  
  while (unvisited.size > 0) {
    let current = null;
    let minHops = Infinity;
    
    unvisited.forEach(node => {
      if (hopCount[node] < minHops || (hopCount[node] === minHops && distances[node] < distances[current])) {
        minHops = hopCount[node];
        current = node;
      }
    });
    
    if (current === null || current === end) break;
    
    unvisited.delete(current);
    
    graph[current].forEach(neighbor => {
      if (unvisited.has(neighbor.node)) {
        const newHops = hopCount[current] + 1;
        const newDist = distances[current] + neighbor.cost;
        
        if (newHops < hopCount[neighbor.node] || 
            (newHops === hopCount[neighbor.node] && newDist < distances[neighbor.node])) {
          hopCount[neighbor.node] = newHops;
          distances[neighbor.node] = newDist;
          previous[neighbor.node] = current;
        }
      }
    });
  }
  
  // Reconstruct path
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}

// Main routing function
export function findRoute(algorithm, source, destination, topology) {
  const graph = buildGraph(topology);
  let path = [];
  
  switch (algorithm) {
    case 'RIP':
      path = bellmanFord(graph, source, destination, topology);
      break;
    case 'OSPF':
      path = dijkstra(graph, source, destination, topology);
      break;
    case 'BGP':
      path = bgpRouting(graph, source, destination, topology);
      break;
    default:
      path = dijkstra(graph, source, destination, topology);
  }
  
  // Calculate total cost and delay
  let totalCost = 0;
  let totalDelay = 0;
  
  for (let i = 0; i < path.length - 1; i++) {
    const connection = topology.connections.find(
      conn => (conn.from === path[i] && conn.to === path[i + 1]) ||
              (conn.to === path[i] && conn.from === path[i + 1])
    );
    if (connection) {
      totalCost += connection.cost;
      totalDelay += connection.delay;
    }
  }
  
  return {
    path,
    totalCost,
    totalDelay,
    hops: path.length - 1
  };
}

// Generate routing table for a specific router
export function generateRoutingTable(routerId, algorithm, topology) {
  const graph = buildGraph(topology);
  const table = [];
  
  topology.routers.forEach(router => {
    if (router.id !== routerId) {
      let path = [];
      
      switch (algorithm) {
        case 'RIP':
          path = bellmanFord(graph, routerId, router.id, topology);
          break;
        case 'OSPF':
          path = dijkstra(graph, routerId, router.id, topology);
          break;
        case 'BGP':
          path = bgpRouting(graph, routerId, router.id, topology);
          break;
        default:
          path = dijkstra(graph, routerId, router.id, topology);
      }
      
      if (path.length > 1) {
        const nextHop = path[1];
        const connection = topology.connections.find(
          conn => (conn.from === routerId && conn.to === nextHop) ||
                  (conn.to === routerId && conn.from === nextHop)
        );
        
        table.push({
          destination: router.id,
          nextHop: nextHop,
          cost: connection ? connection.cost : 0
        });
      }
    }
  });
  
  return table;
}
