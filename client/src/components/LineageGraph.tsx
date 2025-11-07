import { useRef, useEffect, useState } from "react";
import type { LineageNode, LineageEdge } from "@/lib/mockDataProducts";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LineageGraphProps {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

export function LineageGraph({ nodes, edges }: LineageGraphProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const nodeColors = {
    Source: "bg-blue-500",
    DataProduct: "bg-primary",
    Consumer: "bg-green-500",
  };

  const handleZoomIn = () => setScale(s => Math.min(s + 0.2, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.2, 0.5));
  const handleFitToScreen = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    // todo: remove mock functionality
    console.log('Download lineage graph as image');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - offset.x) / scale;
      const y = (e.clientY - rect.top - offset.y) / scale;
      
      const hoveredNodeObj = nodes.find(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) < 50;
      });

      if (hoveredNodeObj) {
        setHoveredNode(hoveredNodeObj.id);
        setTooltipPos({ x: e.clientX, y: e.clientY });
      } else {
        setHoveredNode(null);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant="outline" onClick={handleZoomIn} data-testid="button-zoom-in">
          <ZoomIn className="w-4 h-4 mr-2" />
          Zoom In
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomOut} data-testid="button-zoom-out">
          <ZoomOut className="w-4 h-4 mr-2" />
          Zoom Out
        </Button>
        <Button size="sm" variant="outline" onClick={handleFitToScreen} data-testid="button-fit-screen">
          <Maximize className="w-4 h-4 mr-2" />
          Fit to Screen
        </Button>
        <Button size="sm" variant="outline" onClick={handleDownload} data-testid="button-download">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <div
        ref={canvasRef}
        className="border border-border rounded-lg bg-card overflow-hidden relative cursor-move"
        style={{ height: '500px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-testid="lineage-canvas"
      >
        <svg
          width="100%"
          height="100%"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {edges.map((edge, idx) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            return (
              <line
                key={idx}
                x1={sourceNode.x + 60}
                y1={sourceNode.y + 30}
                x2={targetNode.x}
                y2={targetNode.y + 30}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--border))" />
            </marker>
          </defs>

          {nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                width="120"
                height="60"
                rx="8"
                className={`${nodeColors[node.type]} fill-current`}
                opacity={hoveredNode === node.id ? 0.8 : 1}
              />
              <text
                x="60"
                y="25"
                textAnchor="middle"
                className="fill-white text-xs font-medium"
              >
                {node.id.replace(/_/g, ' ')}
              </text>
              <text
                x="60"
                y="42"
                textAnchor="middle"
                className="fill-white text-[10px]"
                opacity="0.8"
              >
                {node.type}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {hoveredNode && (
        <Card
          className="absolute z-50 px-3 py-2 pointer-events-none"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
          }}
        >
          <p className="text-sm font-medium">{hoveredNode.replace(/_/g, ' ')}</p>
          <p className="text-xs text-muted-foreground">
            {nodes.find(n => n.id === hoveredNode)?.type}
          </p>
        </Card>
      )}
    </div>
  );
}
