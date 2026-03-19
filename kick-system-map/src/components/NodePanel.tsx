'use client';

import {
  SystemNode,
  NODE_COLORS,
  CLUSTER_LABELS,
  TYPE_LABELS,
  POWER_DIMENSIONS,
  computePowerScore,
} from '@/lib/types';

interface NodePanelProps {
  node: SystemNode | null;
  onClose: () => void;
}

export default function NodePanel({ node, onClose }: NodePanelProps) {
  if (!node) return null;

  const color = NODE_COLORS[node.type];
  const powerScore = computePowerScore(node.power);

  return (
    <div className="node-panel">
      <button className="panel-close" onClick={onClose}>
        &times;
      </button>

      <div className="panel-header">
        <div className="panel-dot" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}66` }} />
        <div>
          <h2 className="panel-name">{node.label}</h2>
          <p className="panel-role">{node.role}</p>
        </div>
      </div>

      {/* Power Score */}
      <div className="power-score-row">
        <span className="power-score-label">Power Score</span>
        <span className="power-score-value" style={{ color }}>{powerScore.toFixed(1)}</span>
        <span className="power-score-max">/ 5.0</span>
      </div>

      {/* Power Breakdown */}
      <div className="power-breakdown">
        <h3 className="section-title">Power Breakdown</h3>
        {POWER_DIMENSIONS.map(({ key, label }) => {
          const val = node.power[key];
          return (
            <div key={key} className="power-row">
              <span className="power-label">{label}</span>
              <div className="power-bar-track">
                <div
                  className="power-bar-fill"
                  style={{
                    width: `${val * 20}%`,
                    backgroundColor: val >= 4 ? color : val >= 2 ? '#7CFF4F88' : '#444',
                    boxShadow: val >= 4 ? `0 0 8px ${color}44` : 'none',
                  }}
                />
              </div>
              <span className="power-val">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Meta */}
      <div className="panel-meta">
        <div className="meta-row">
          <span className="meta-label">Type</span>
          <span className="meta-value" style={{ color }}>{TYPE_LABELS[node.type]}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Engine</span>
          <span className="meta-value">{CLUSTER_LABELS[node.cluster]}</span>
        </div>
        {node.location && (
          <div className="meta-row">
            <span className="meta-label">Location</span>
            <span className="meta-value">{node.location}</span>
          </div>
        )}
        <div className="meta-row">
          <span className="meta-label">Confidence</span>
          <span className={`confidence-badge confidence-${node.confidence}`}>
            {node.confidence}
          </span>
        </div>
        {node.x_handle && (
          <div className="meta-row">
            <span className="meta-label">X / Twitter</span>
            <span className="meta-value" style={{ color: '#53FC18' }}>{node.x_handle}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {node.description && (
        <div className="panel-section">
          <h3 className="section-title">Analysis</h3>
          <p className="section-body">{node.description}</p>
        </div>
      )}

      {/* Intel (original detail field) */}
      {node.detail && node.detail !== node.description && (
        <div className="panel-section">
          <h3 className="section-title">Raw Intel</h3>
          <p className="section-body section-body-dim">{node.detail}</p>
        </div>
      )}

      {/* Connections */}
      {node.connections && node.connections.length > 0 && (
        <div className="panel-section">
          <h3 className="section-title">Connections ({node.connections.length})</h3>
          <ul className="connections-list">
            {node.connections.map((c, i) => (
              <li key={i} className="connection-item">{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
