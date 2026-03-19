'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NodePanel from '@/components/NodePanel';
import Controls from '@/components/Controls';
import IntroOverlay from '@/components/IntroOverlay';
import { SystemNode, ViewMode } from '@/lib/types';

const Graph = dynamic(() => import('@/components/Graph'), { ssr: false });

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('influence');
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);

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
      <div style={{ position: "fixed", bottom: 10, right: 10, fontSize: 12, opacity: 0.5 }}>
        deploy test v1
      </div>
    </main>
  );
}
