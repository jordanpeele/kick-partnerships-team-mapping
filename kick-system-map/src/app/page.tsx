'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NodePanel from '@/components/NodePanel';
import Controls from '@/components/Controls';
import IntroOverlay from '@/components/IntroOverlay';
import AboutModal from '@/components/AboutModal';
import { SystemNode, ViewMode } from '@/lib/types';
import { graphData } from '@/lib/graphData';

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

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('heat');
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Preselect Ed Craven on initial load
  useEffect(() => {
    setSelectedNode(buildNodeSelection('craven'));
  }, []);

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
