import './Summary.css';

function Summary({ result, onReset }) {
  if (!result) return null;

  const { algorithm, path, totalDelay, hops, source, destination } = result;

  return (
    <div className="summary-overlay">
      <div className="summary-card">
        <div className="success-icon">🎉</div>
        <h2>Packet Delivered Successfully!</h2>
        
        <div className="summary-details">
          <div className="detail-row">
            <span className="detail-label">Algorithm:</span>
            <span className="detail-value">{algorithm}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Route:</span>
            <span className="detail-value">{source} → {destination}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Path:</span>
            <span className="detail-value path-value">{path.join(' → ')}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total Hops:</span>
            <span className="detail-value">{hops}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total Delay:</span>
            <span className="detail-value">{totalDelay} ms</span>
          </div>
        </div>

        <button className="reset-button" onClick={onReset}>
          🔁 Run Another Simulation
        </button>
      </div>
    </div>
  );
}

export default Summary;
