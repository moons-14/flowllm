"use client";
import { initialEdges } from '@/components/edges';
import { FlowSidebar } from '@/components/layout/flowSidebar';
import { nodeTypes } from '@/components/nodes';
import { FlowStore, useStore } from '@/store';
import { DragEvent, useCallback, useRef } from 'react';
import type { Connection, Edge, OnConnect, OnEdgeUpdateFunc } from "reactflow";
import ReactFlow, { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, ReactFlowProvider, addEdge, applyEdgeChanges, applyNodeChanges, updateEdge, useEdgesState, useNodesState } from 'reactflow';
import { shallow } from 'zustand/shallow';

const selector = (store: FlowStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  reactFlowInstance: store.reactFlowInstance,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onEdgeUpdate: store.onEdgeUpdate,
  onEdgeUpdateStart: store.onEdgeUpdateStart,
  onEdgeUpdateEnd: store.onEdgeUpdateEnd,
  setReactFlowInstance: store.setReactFlowInstance,
  onDrop: store.onDrop,
  isValidConnection: store.isValidConnection,
});


export default function Home() {
  const store = useStore(selector, shallow);
  const reactFlowWrapper = useRef(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  return (
    <>
      <div className='w-full h-full'>
        <ReactFlowProvider>
          <div className='flex h-full'>
            <FlowSidebar className="w-80" />
            <div className="reactflow-wrapper flex-1" ref={reactFlowWrapper}>
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
                isValidConnection={store.isValidConnection}
                onInit={store.setReactFlowInstance}
                onDrop={store.onDrop}
                onDragOver={onDragOver}
              >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              </ReactFlow>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
}
