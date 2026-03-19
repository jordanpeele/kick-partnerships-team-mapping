'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import NodePanel from '@/components/NodePanel';
import Controls from '@/components/Controls';
import IntroOverlay from '@/components/IntroOverlay';
import AboutModal from '@/components/AboutModal';
import { SystemNode, ViewMode } from '@/lib/types';
import { graphData, viewFilters } from '@/lib/graphData';

const Graph = dynamic(() => import('@/components/Graph'), { ssr: false });

function buildNodeSelection(id: string): SystemNode | null {
  const node = graphData.nodes.find((n) => n.id === id);
  if (!node) return null;
  const connections = graphData.edges
    .filter((e) => e.source === node.id || e.target === node.id)
    .map((e) => {
      const otherId = e.source === node.id ? e.target : e.source;
      const other = graphData.nodes.find((n) => n.id === otherId);
      return `${e.type.replace(/_/g, ' ')} → ${other?.label || otherId}`;
    });
  return { ...node, connections };
}

const VALID_VIEWS = Object.keys(viewFilters) as ViewMode[];

function MapContent() {
  const searchParams = useSearchParams();

  // Initialize state from URL params, fallback to defaults
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const v = searchParams.get('view');
    return v && VALID_VIEWS.includes(v as ViewMode) ? (v as ViewMode) : 'heat';
  });

  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(() => {
    const nodeParam = searchParams.get('node');
    // Explicit node param → use it (or null if invalid)
    if (nodeParam) return buildNodeSelection(nodeParam);
    // No params at all → default experience with Craven
    if (!searchParams.get('view')) return buildNodeSelection('craven');
    // View set but no node → no preselection
    return null;
  });

  const [aboutOpen, setAboutOpen] = useState(false);

  // Sync state → URL (using history API to avoid re-render cycle)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('view', viewMode);
    if (selectedNode) {
      params.set('node', selectedNode.id);
    }
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [viewMode, selectedNode]);

  return (
    <main className="app">
      <IntroOverlay />
      <Controls viewMode={viewMode} onViewChange={setViewMode} />
      <div className="workspace">
        <Graph
          viewMode={viewMode}
          onNodeSelect={setSelectedNode}
          selectedNodeId={selectedNode?.id || null}
        />
        <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
      <div className="map-label">KICK SYSTEM MAP &mdash; MAR 2026</div>
      <button
        className="about-trigger"
        onClick={() => setAboutOpen(true)}
        aria-label="About this map"
      >
        ?
      </button>
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <MapContent />
    </Suspense>
  );
}
