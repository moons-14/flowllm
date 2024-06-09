import { applyNodeChanges, applyEdgeChanges, OnNodesChange, OnEdgesChange, OnConnect, Node, Edge } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export const initialNodes = [
    { id: 'node-1', type: 'llm', position: { x: 900, y: 400 }, data: undefined },
    { id: 'node-2', type: 'plaintext', position: { x: 400, y: 300 }, data: { title: 'InputTitle', content: 'Content' } },
    { id: 'node-3', type: 'plaintext', position: { x: 1200, y: 300 }, data: { title: 'OutputTitle', content: 'Content' } },
];

export type FlowStore = {
    nodes: Node[];
    edges: Edge[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;

    addEdge: OnConnect;

    updateNode: (id: string, data: any) => void;
}

export const useStore = create<FlowStore>((set, get) => ({
    nodes: [...initialNodes],
    edges: [],

    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange(changes) {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    addEdge(data) {
        const id = nanoid(6);
        const edge = { id, ...data } as Edge;

        set({ edges: [edge, ...get().edges] });
    },

    updateNode(id, data) {
        set({
            nodes: get().nodes.map(node =>
                node.id === id
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            )
        });
    },
}));