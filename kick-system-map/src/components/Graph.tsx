'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { graphData, viewFilters } from '@/lib/graphData';
import { SystemNode, ViewMode, NODE_COLORS, EDGE_COLORS, computePowerScore } from '@/lib/types';
import type { EdgeType } from '@/lib/types';

interface GraphProps {
  viewMode: ViewMode;
  onNodeSelect: (node: SystemNode | null) => void;
  selectedNodeId: string | null;
}

interface GraphNode extends SystemNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  type: EdgeType;
  strength: number;
  label?: string;
}

// Monotonic timestamp for glow animation (avoid re-renders)
let animFrame = 0;

export default function Graph({ viewMode, onNodeSelect, selectedNodeId }: GraphProps) {
  const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const hoveredRef = useRef<string | null>(null);
  const zoomRef = useRef(1);
  const [, forceRender] = useState(0);

  // Use ref for hover to avoid re-renders on every mouse move
  const setHovered = useCallback((id: string | null) => {
    if (hoveredRef.current !== id) {
      hoveredRef.current = id;
      forceRender((n) => n + 1);
    }
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation loop for glow pulse
  useEffect(() => {
    let running = true;
    const tick = () => {
      animFrame = Date.now();
      if (running) requestAnimationFrame(tick);
    };
    tick();
    return () => { running = false; };
  }, []);

  const filter = viewFilters[viewMode];
  const isHeatMode = viewMode === 'heat';

  // Spotlight: compute connected node IDs for selected node
  const spotlightIds = useMemo(() => {
    if (!selectedNodeId) return null;
    const ids = new Set<string>([selectedNodeId]);
    graphData.edges.forEach((e) => {
      if (e.source === selectedNodeId) ids.add(e.target);
      if (e.target === selectedNodeId) ids.add(e.source);
    });
    return ids;
  }, [selectedNodeId]);

  const { data } = useMemo(() => {
    const filteredEdges = graphData.edges.filter((e) =>
      (filter.edgeTypes as readonly string[]).includes(e.type)
    );
    const connectedNodeIds = new Set<string>();
    filteredEdges.forEach((e) => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });

    let nodes: SystemNode[];
    if (filter.showAllNodes) {
      nodes = graphData.nodes;
    } else {
      nodes = graphData.nodes.filter((n) => connectedNodeIds.has(n.id));
    }

    return {
      data: {
        nodes: nodes.map((n) => ({ ...n })),
        links: filteredEdges.map((e) => ({ ...e })),
      },
    };
  }, [filter, viewMode]);

  const getNodeRadius = useCallback(
    (node: GraphNode) => {
      if (isHeatMode) {
        const ps = computePowerScore(node.power);
        return Math.max(ps * 6 + 4, 8);
      }
      const base = node.weight * 4 + 6;
      const isHighlighted = filter.highlightNodes.includes(node.id);
      return Math.max(isHighlighted ? base * 1.2 : base, 7);
    },
    [filter.highlightNodes, isHeatMode]
  );

  const getNodeOpacity = useCallback(
    (node: GraphNode) => {
      // Spotlight mode takes priority when a node is selected
      if (spotlightIds) {
        return spotlightIds.has(node.id) ? 1 : 0.12;
      }
      if (!filter.fadeNonHighlighted) return 1;
      return filter.highlightNodes.includes(node.id) ? 1 : 0.2;
    },
    [filter.fadeNonHighlighted, filter.highlightNodes, spotlightIds]
  );

  const nodeCanvasObject = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const r = getNodeRadius(node);
      const isSelected = selectedNodeId === node.id;
      const isHovered = hoveredRef.current === node.id;
      const isHighlighted = filter.highlightNodes.includes(node.id);
      const color = NODE_COLORS[node.type];
      const opacity = getNodeOpacity(node);
      const ps = computePowerScore(node.power);

      ctx.globalAlpha = opacity;

      // Animated glow for high-power nodes and influencers
      const shouldGlow = isHeatMode
        ? ps >= 3
        : (node.type === 'influencer' || isSelected || isHovered || (isHighlighted && ps >= 3.5));

      if (shouldGlow) {
        ctx.save();
        const pulse = Math.sin(animFrame / 800 + node.weight) * 0.3 + 0.7;
        const glowIntensity = isHeatMode ? ps * 6 : isSelected ? 30 : isHovered ? 24 : 12;
        ctx.shadowColor = color;
        ctx.shadowBlur = glowIntensity * pulse;
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r * 1.3, 0, 2 * Math.PI);
        ctx.fillStyle = color + '18';
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = opacity;
      }

      // Outer ring for highlighted/selected
      if ((isHighlighted || isSelected) && !isHeatMode) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r + 2, 0, 2 * Math.PI);
        ctx.strokeStyle = color + '88';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Main fill
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? '#FFFFFF' : color;
      ctx.fill();

      // Inner dot for decision makers
      if (node.type === 'decision_maker') {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r * 0.35, 0, 2 * Math.PI);
        ctx.fillStyle = '#0B0B0C';
        ctx.fill();
      }

      // External: diamond-ish inner mark
      if (node.type === 'external') {
        ctx.beginPath();
        const s = r * 0.3;
        ctx.moveTo(node.x!, node.y! - s);
        ctx.lineTo(node.x! + s, node.y!);
        ctx.lineTo(node.x!, node.y! + s);
        ctx.lineTo(node.x! - s, node.y!);
        ctx.closePath();
        ctx.fillStyle = '#0B0B0C';
        ctx.fill();
      }

      // Hover ring
      if (isHovered && !isSelected) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r + 3, 0, 2 * Math.PI);
        ctx.strokeStyle = '#FFFFFF44';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Zoom-aware labels: only show if zoomed in enough, or node is hovered/selected/highlighted
      const zoom = zoomRef.current;
      const showLabel = isHovered || isSelected || isHighlighted || zoom >= 1.2 || isHeatMode;

      if (showLabel) {
        const fontSize = Math.max(11 / globalScale, 3.5);
        const labelAlpha = isHovered || isSelected ? 1 : opacity * 0.85;
        ctx.globalAlpha = labelAlpha;
        ctx.font = `${isHighlighted || isHovered ? '600' : '400'} ${fontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = isSelected || isHovered ? '#FFFFFF' : '#A1A1AA';
        ctx.fillText(node.label, node.x!, node.y! + r + 4);

        // Role subtitle on hover/select
        if (isHovered || isSelected) {
          const subtitleSize = Math.max(8.5 / globalScale, 2.5);
          ctx.font = `400 ${subtitleSize}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = '#888888';
          const roleText = node.role.length > 40 ? node.role.substring(0, 40) + '...' : node.role;
          ctx.fillText(roleText, node.x!, node.y! + r + 4 + fontSize + 2);
        }
      }

      ctx.globalAlpha = 1;
    },
    [selectedNodeId, filter.highlightNodes, getNodeRadius, getNodeOpacity, isHeatMode, spotlightIds]
  );

  const linkCanvasObject = useCallback(
    (link: GraphLink, ctx: CanvasRenderingContext2D) => {
      const source = link.source as GraphNode;
      const target = link.target as GraphNode;
      if (!source.x || !target.x) return;

      const edgeColor = EDGE_COLORS[link.type] || '#333333';
      const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
      const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;
      const isHovered = hoveredRef.current === sourceId || hoveredRef.current === targetId;

      // Fade edges: spotlight mode or view-level fading
      let edgeOpacity = 1;
      if (spotlightIds) {
        edgeOpacity = (spotlightIds.has(sourceId) && spotlightIds.has(targetId)) ? 0.9 : 0.05;
      } else if (filter.fadeNonHighlighted) {
        const sourceHighlighted = filter.highlightNodes.includes(sourceId);
        const targetHighlighted = filter.highlightNodes.includes(targetId);
        edgeOpacity = (sourceHighlighted && targetHighlighted) ? 0.8 : 0.1;
      }

      ctx.globalAlpha = isHovered ? Math.max(edgeOpacity, 0.6) : edgeOpacity;

      // Curved line path
      const dx = target.x - source.x;
      const dy = target.y! - source.y!;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const curvature = Math.min(dist * 0.08, 15);
      const mx = (source.x + target.x) / 2 - dy * curvature / dist;
      const my = (source.y! + target.y!) / 2 + dx * curvature / dist;

      // Edge visual distinction by type
      const isDashed = link.type === 'executes' || link.type === 'collaborates_with';
      const isInfluence = link.type === 'influences';
      const isNegotiates = link.type === 'negotiates_with';

      ctx.beginPath();
      ctx.moveTo(source.x, source.y!);

      if (isDashed) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.quadraticCurveTo(mx, my, target.x, target.y!);
      ctx.strokeStyle = isHovered ? edgeColor.replace('66', 'BB') : edgeColor;

      // Thicker lines for negotiates_with, thinner for dashed types
      let lineWidth = link.strength * 0.2;
      if (isNegotiates) lineWidth = link.strength * 0.4;
      if (isHovered) lineWidth = Math.max(lineWidth * 1.8, 1);

      ctx.lineWidth = lineWidth;

      // Green glow for influence edges
      if (isInfluence && !isDashed) {
        ctx.save();
        ctx.shadowColor = '#53FC18';
        ctx.shadowBlur = isHovered ? 8 : 4;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = isHovered ? Math.max(edgeOpacity, 0.6) : edgeOpacity;
      } else {
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Arrow at target
      const t = 0.95;
      const ax = (1 - t) * (1 - t) * source.x + 2 * (1 - t) * t * mx + t * t * target.x;
      const ay = (1 - t) * (1 - t) * source.y! + 2 * (1 - t) * t * my + t * t * target.y!;
      const tangentX = 2 * (1 - t) * (mx - source.x) + 2 * t * (target.x - mx);
      const tangentY = 2 * (1 - t) * (my - source.y!) + 2 * t * (target.y! - my);
      const angle = Math.atan2(tangentY, tangentX);
      const arrowLen = 3.5;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(
        ax - arrowLen * Math.cos(angle - Math.PI / 6),
        ay - arrowLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        ax - arrowLen * Math.cos(angle + Math.PI / 6),
        ay - arrowLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = isHovered ? edgeColor.replace('66', 'BB') : edgeColor;
      ctx.fill();

      ctx.globalAlpha = 1;
    },
    [filter.fadeNonHighlighted, filter.highlightNodes, spotlightIds]
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      const fullNode = graphData.nodes.find((n) => n.id === node.id);
      if (fullNode) {
        const connections = graphData.edges
          .filter((e) => e.source === fullNode.id || e.target === fullNode.id)
          .map((e) => {
            const otherId = e.source === fullNode.id ? e.target : e.source;
            const otherNode = graphData.nodes.find((n) => n.id === otherId);
            return `${e.type.replace(/_/g, ' ')} → ${otherNode?.label || otherId}`;
          });
        onNodeSelect({ ...fullNode, connections });
      }
    },
    [onNodeSelect]
  );

  // Force configuration
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const charge = fg.d3Force('charge') as any;
      if (charge) charge.strength(-400).distanceMax(300);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const link = fg.d3Force('link') as any;
      if (link) {
        link.distance((l: GraphLink) => {
          const s = l.strength || 3;
          return 100 - s * 10;
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const center = fg.d3Force('center') as any;
      if (center) center.strength(0.05);

      setTimeout(() => {
        fg.zoomToFit(500, 80);
      }, 700);
    }
  }, [viewMode]);

  return (
    <div ref={containerRef} className="graph-container">
      <div className="graph-vignette" />
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeId="id"
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={(node: GraphNode, color, ctx) => {
          const r = getNodeRadius(node) + 5;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        }}
        linkCanvasObject={linkCanvasObject}
        onNodeClick={handleNodeClick}
        onNodeHover={(node: GraphNode | null) => {
          setHovered(node?.id || null);
          if (containerRef.current) {
            containerRef.current.style.cursor = node ? 'pointer' : 'grab';
          }
        }}
        onBackgroundClick={() => onNodeSelect(null)}
        onZoom={({ k }) => { zoomRef.current = k; }}
        backgroundColor="rgba(0,0,0,0)"
        cooldownTicks={80}
        warmupTicks={40}
        d3AlphaDecay={0.03}
        d3VelocityDecay={0.35}
        enableNodeDrag={true}
        minZoom={0.4}
        maxZoom={8}
      />
    </div>
  );
}
