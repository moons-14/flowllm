"use client";
import { initialEdges } from '@/components/edges';
import { nodeTypes } from '@/components/nodes';
import { FlowStore, useStore } from '@/store';
import { useCallback, useRef } from 'react';
import type { Connection, Edge, OnConnect, OnEdgeUpdateFunc } from "reactflow";
import ReactFlow, { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, addEdge, applyEdgeChanges, applyNodeChanges, updateEdge, useEdgesState, useNodesState } from 'reactflow';
import { shallow } from 'zustand/shallow';

const selector = (store: FlowStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onEdgeUpdate: store.onEdgeUpdate,
  onEdgeUpdateStart: store.onEdgeUpdateStart,
  onEdgeUpdateEnd: store.onEdgeUpdateEnd,
});


export default function Home() {
  const store = useStore(selector, shallow);

  return (
    <>
      <div className='w-full h-full'>
        <ReactFlow
          nodes={store.nodes}
          nodeTypes={nodeTypes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.addEdge}
          onEdgeUpdate={store.onEdgeUpdate}
          onEdgeUpdateStart={store.onEdgeUpdateStart}
          onEdgeUpdateEnd={store.onEdgeUpdateEnd}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
