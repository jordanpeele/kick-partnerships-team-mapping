export type NodeType = 'decision_maker' | 'operator' | 'influencer' | 'execution' | 'external';
export type Cluster = 'deal' | 'program' | 'growth' | 'exec' | 'product' | 'ops' | 'external';
export type EdgeType = 'reports_to' | 'influences' | 'negotiates_with' | 'collaborates_with' | 'executes';
export type ViewMode = 'influence' | 'org' | 'dealflow' | 'heat' | 'case_xqc';
export type Confidence = 'high' | 'medium' | 'low';

export interface PowerProfile {
  capital_control: number;    // 1-5: access to budget/spending authority
  deal_authority: number;     // 1-5: can approve or block deals
  narrative_influence: number; // 1-5: shapes public perception & creator sentiment
  network_centrality: number; // 1-5: how many relationships flow through them
}

export interface SystemNode {
  id: string;
  label: string;
  role: string;
  type: NodeType;
  weight: number;
  cluster: Cluster;
  power: PowerProfile;
  description: string;
  location?: string;
  confidence: Confidence;
  x_handle?: string;
  detail?: string;
  connections?: string[];
}

export interface SystemEdge {
  source: string;
  target: string;
  type: EdgeType;
  strength: number;
  label?: string;
}

export interface GraphData {
  nodes: SystemNode[];
  edges: SystemEdge[];
}

// Derived power score: weighted average favoring deal_authority and network_centrality
export function computePowerScore(p: PowerProfile): number {
  return (
    p.capital_control * 0.2 +
    p.deal_authority * 0.3 +
    p.narrative_influence * 0.2 +
    p.network_centrality * 0.3
  );
}

export const POWER_DIMENSIONS: { key: keyof PowerProfile; label: string }[] = [
  { key: 'capital_control', label: 'Capital Control' },
  { key: 'deal_authority', label: 'Deal Authority' },
  { key: 'narrative_influence', label: 'Narrative Influence' },
  { key: 'network_centrality', label: 'Network Centrality' },
];

// Colors
export const NODE_COLORS: Record<NodeType, string> = {
  decision_maker: '#53FC18',
  operator: '#7CFF4F',
  influencer: '#53FC18',
  execution: '#666666',
  external: '#8B5CF6',
};

export const CLUSTER_LABELS: Record<Cluster, string> = {
  exec: 'Executive Layer',
  deal: 'Deal Engine',
  program: 'Program Engine',
  growth: 'Growth Engine',
  product: 'Product',
  ops: 'Operations',
  external: 'External Nodes',
};

export const EDGE_COLORS: Record<EdgeType, string> = {
  reports_to: '#333333',
  influences: '#53FC1866',
  negotiates_with: '#8B5CF666',
  collaborates_with: '#444444',
  executes: '#555555',
};

export const TYPE_LABELS: Record<NodeType, string> = {
  decision_maker: 'Decision Maker',
  operator: 'Operator',
  influencer: 'Influencer',
  execution: 'Execution',
  external: 'External',
};
