import { useEffect, useState } from 'react';
import { generateRoutingTable } from '../utils/routingAlgorithms';
import './RoutingTable.css';

function RoutingTable({ currentRouter, algorithm, activePath, currentHop, topology }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (currentRouter && algorithm && topology) {
      const table = generateRoutingTable(currentRouter, algorithm, topology);
      setTableData(table);
    }
  }, [currentRouter, algorithm, topology]);

  // Highlight the row that matches current routing decision
  const isRowActive = (destination) => {
    if (!activePath || currentHop >= activePath.length - 1) return false;
    const nextRouter = activePath[currentHop + 1];
    return destination === nextRouter;
  };

  return (
    <div className="routing-table">
      <h3>📊 Routing Table - {currentRouter || 'Select Router'}</h3>
      <p className="table-subtitle">Algorithm: {algorithm}</p>
      
      {tableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Next Hop</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr 
                key={idx} 
                className={isRowActive(row.destination) ? 'active-row' : ''}
              >
                <td>{row.destination}</td>
                <td>{row.nextHop}</td>
                <td>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">Start simulation to view routing table</p>
      )}
    </div>
  );
}

export default RoutingTable;
