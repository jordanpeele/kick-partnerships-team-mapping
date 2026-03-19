'use client';

import { ViewMode, NODE_COLORS, TYPE_LABELS } from '@/lib/types';
import { viewFilters } from '@/lib/graphData';

interface ControlsProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export default function Controls({ viewMode, onViewChange }: ControlsProps) {
  const modes = Object.keys(viewFilters) as ViewMode[];

  return (
    <div className="controls-bar">
      <div className="controls-left">
        <div className="logo">
          <span className="logo-kick">KICK</span>
          <span className="logo-sep">/</span>
          <span className="logo-sub">System Map</span>
        </div>
      </div>

      <div className="controls-center">
        {modes.map((mode) => {
          const f = viewFilters[mode];
          const isCase = mode.startsWith('case_');
          return (
            <button
              key={mode}
              className={`view-toggle ${viewMode === mode ? 'active' : ''} ${isCase ? 'view-toggle-case' : ''}`}
              onClick={() => onViewChange(mode)}
            >
              <span className="toggle-label">{f.label}</span>
              <span className="toggle-desc">{f.description}</span>
            </button>
          );
        })}
      </div>

      <div className="controls-right">
        <div className="legend">
          {(Object.keys(NODE_COLORS) as (keyof typeof NODE_COLORS)[]).map((type) => (
            <div key={type} className="legend-item">
              <div
                className="legend-dot"
                style={{
                  backgroundColor: NODE_COLORS[type],
                  boxShadow: type === 'influencer' ? `0 0 8px ${NODE_COLORS[type]}` : 'none',
                }}
              />
              <span className="legend-text">{TYPE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
