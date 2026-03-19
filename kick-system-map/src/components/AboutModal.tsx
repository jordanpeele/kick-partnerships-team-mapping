'use client';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="about-backdrop" onClick={onClose}>
      <div className="about-modal" onClick={(e) => e.stopPropagation()}>
        <button className="about-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="about-title">About this map</h2>

        <div className="about-section">
          <h3 className="about-heading">What is this?</h3>
          <p className="about-text">
            An interactive network map of Kick&apos;s partnerships team — the people, roles,
            and relationships that drive creator deals on the platform.
          </p>
        </div>

        <div className="about-section">
          <h3 className="about-heading">What is &ldquo;Power Score&rdquo;?</h3>
          <p className="about-text">
            A weighted composite (1–5) of four dimensions: <strong>Capital Control</strong> (budget
            access), <strong>Deal Authority</strong> (can approve/block deals), <strong>Narrative
            Influence</strong> (shapes perception), and <strong>Network Centrality</strong> (how
            many relationships flow through them). Deal Authority and Network Centrality are
            weighted more heavily (30% each).
          </p>
        </div>

        <div className="about-section">
          <h3 className="about-heading">How to use</h3>
          <ul className="about-list">
            <li><strong>Click a node</strong> to see their profile, power breakdown, and connections</li>
            <li><strong>Switch views</strong> in the top bar to see different relationship layers</li>
            <li><strong>Heat view</strong> shows power concentration — bigger glow = more power</li>
            <li><strong>Deal Flow</strong> traces how partnerships move from negotiation to execution</li>
            <li><strong>Case: xQc</strong> replays the $100M deal path</li>
            <li><strong>Drag nodes</strong> to rearrange, scroll to zoom</li>
          </ul>
        </div>

        <div className="about-section about-confidence">
          <h3 className="about-heading">Confidence levels</h3>
          <p className="about-text">
            Each node has a confidence rating (<span className="about-conf-high">high</span>,{' '}
            <span className="about-conf-med">medium</span>,{' '}
            <span className="about-conf-low">low</span>) reflecting how well-sourced the
            information is.
          </p>
        </div>
      </div>
    </div>
  );
}
