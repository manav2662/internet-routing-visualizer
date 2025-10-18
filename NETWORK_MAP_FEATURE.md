# Network Map Selection Feature 🗺️

## Overview
Added a **Network Topology Selector** that allows users to switch between different predefined network layouts, making the simulator more interactive and educational.

## What Was Added

### 1. **New File: `networkTopologies.js`**
Contains 6 predefined network topologies:

- **Default Network** - Balanced mesh topology (original layout)
- **Star Network** - Central hub with all routers connected to R1
- **Ring Network** - Circular topology where routers form a ring
- **Mesh Network** - Fully connected with multiple redundant paths
- **Tree Network** - Hierarchical structure with root and branches
- **Linear Network** - Sequential chain of routers

Each topology includes:
- Router positions (x, y coordinates)
- Connection links with cost and delay
- Name and description

### 2. **New Component: `MapSelector.jsx`**
A dropdown selector component that:
- Shows all available network topologies
- Displays the selected topology's description
- Disables during simulation
- Styled to match the control panel design

### 3. **Updated Components**

#### **App.jsx**
- Added state for `selectedMap` and `currentTopology`
- Created `handleMapChange()` function to switch topologies
- Resets simulation state when map changes
- Passes topology to all child components

#### **ControlPanel.jsx**
- Now receives `topology` prop
- Dynamically generates router options from current topology
- Auto-resets source/destination when topology changes

#### **NetworkMap.jsx**
- Receives `topology` prop instead of importing static data
- Renders routers and connections based on selected topology

#### **RoutingTable.jsx**
- Receives `topology` prop
- Generates routing table based on current topology

#### **routingAlgorithms.js**
- All functions now accept `topology` parameter
- No longer uses hardcoded `networkTopology`
- Works with any topology structure

## How It Works

### User Flow:
1. User opens the app → sees "Default Network" selected
2. User clicks the "Network Topology" dropdown
3. Selects a different topology (e.g., "Star Network")
4. The map instantly updates with new router positions and connections
5. Source and destination are auto-reset to first and last routers
6. User can now run simulations on the new topology

### Technical Flow:
```
User selects map
  ↓
handleMapChange() triggered
  ↓
Load new topology from networkTopologies.js
  ↓
Update currentTopology state
  ↓
Reset all simulation states
  ↓
Components re-render with new topology
  ↓
NetworkMap shows new layout
  ↓
ControlPanel updates router options
```

## Benefits

### Educational Value:
- **Compare algorithms** across different network structures
- **Understand topology impact** on routing efficiency
- **Visualize different designs** (star, ring, mesh, etc.)
- **Experiment freely** without breaking the simulation

### User Experience:
- **Interactive exploration** of network concepts
- **Visual learning** through different layouts
- **Flexibility** to test various scenarios
- **Professional UI** with smooth transitions

## Example Use Cases

1. **Compare Star vs Mesh**
   - See how star topology has single point of failure
   - Observe mesh topology's redundancy advantages

2. **Ring Network Behavior**
   - Watch packets travel in circular path
   - Understand why ring networks can be inefficient

3. **Linear Chain**
   - See how packets hop through sequential routers
   - Observe increasing delay with more hops

4. **Algorithm Comparison**
   - Run RIP, OSPF, and BGP on same topology
   - Switch topologies to see algorithm behavior differences

## Files Modified/Created

### Created:
- `src/utils/networkTopologies.js` - Topology definitions
- `src/components/MapSelector.jsx` - Selector component
- `src/components/MapSelector.css` - Selector styling

### Modified:
- `src/App.jsx` - Added map selection logic
- `src/components/ControlPanel.jsx` - Dynamic router options
- `src/components/NetworkMap.jsx` - Accept topology prop
- `src/components/RoutingTable.jsx` - Accept topology prop
- `src/utils/routingAlgorithms.js` - Accept topology parameter

## Future Enhancements (Optional)

- Add visual preview thumbnails for each topology
- Allow users to create custom topologies
- Add more predefined topologies (hybrid, bus, etc.)
- Save/load custom topology configurations
- Export topology data as JSON

---

**Result**: A fully functional, interactive network topology selector that enhances the educational value and user experience of the routing visualizer! 🎉
