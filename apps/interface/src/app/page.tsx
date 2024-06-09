"use client";
import { initialEdges } from '@/components/edges';
import { initialNodes, nodeTypes } from '@/components/nodes';
import { useCallback, useRef } from 'react';
import type { Connection, Edge, OnConnect, OnEdgeUpdateFunc } from "reactflow";
import ReactFlow, { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, addEdge, applyEdgeChanges, applyNodeChanges, updateEdge, useEdgesState, useNodesState } from 'reactflow';


export default function Home() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);


  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const isValidConnection = (connection: Connection): boolean => {
    console.log('connection', connection)

    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    console.log('sourceNode', sourceNode)
    console.log('targetNode', targetNode)

    // sourceのtypeがplaintextでかつtargetのtypeがllmの場合、targetHandleがllm-target-textの場合のみ接続を許可
    if (sourceNode.type === 'plaintext' && targetNode.type === 'llm') {
      if (connection.targetHandle === 'llm-target-text') {
        return true;
      } else {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <div className='w-full h-full'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
