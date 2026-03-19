'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kick-map-intro-dismissed';

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    }
  }, []);

  const handleEnter = () => {
    if (dontShow) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="intro-backdrop" onClick={handleEnter}>
      <div className="intro-modal" onClick={(e) => e.stopPropagation()}>
        <div className="intro-header">
          <span className="intro-kick">KICK</span>
          <span className="intro-sep">/</span>
          <span className="intro-title">System Map</span>
        </div>

        <p className="intro-lead">
          An interactive map of how creator deals actually happen at Kick.
        </p>

        <div className="intro-legend">
          <div className="intro-legend-row">
            <span className="intro-bullet" />
            <span><strong>Nodes</strong> = people or entities</span>
          </div>
          <div className="intro-legend-row">
            <span className="intro-bullet" />
            <span><strong>Size</strong> = influence level</span>
          </div>
          <div className="intro-legend-row">
            <span className="intro-bullet" />
            <span><strong>Color</strong> = role in the system</span>
          </div>
          <div className="intro-legend-row">
            <span className="intro-bullet" />
            <span><strong>Edges</strong> = relationships</span>
          </div>
        </div>

        <div className="intro-hints">
          <p className="intro-hint">
            <span className="intro-arrow">&rarr;</span>
            <strong>Heat</strong> to see who holds power
          </p>
          <p className="intro-hint">
            <span className="intro-arrow">&rarr;</span>
            <strong>Deal Flow</strong> to see how signings work
          </p>
          <p className="intro-hint">
            <span className="intro-arrow">&rarr;</span>
            <strong>Case: xQc</strong> to replay a real deal
          </p>
        </div>

        <button className="intro-enter" onClick={handleEnter}>
          Enter Map
        </button>

        <label className="intro-dismiss">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
          />
          <span>Don&apos;t show again</span>
        </label>
      </div>
    </div>
  );
}
