import { applyNodeChanges, applyEdgeChanges, OnNodesChange, OnEdgesChange, OnConnect, Node, Edge, OnEdgeUpdateFunc, updateEdge } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export const initialNodes = [
    { id: 'node-1', type: 'llm', position: { x: 900, y: 400 } },
    { id: 'node-2', type: 'plaintext', position: { x: 400, y: 300 }, data: { title: 'InputTitle', content: 'Content' } },
    { id: 'node-3', type: 'plaintext', position: { x: 1200, y: 300 }, data: { title: 'OutputTitle', content: 'Content' } },
] as Node[];

export type FlowStore = {
    nodes: Node[];
    edges: Edge[];
    edgeUpdateSuccessful: boolean;

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;

    addEdge: OnConnect;

    updateNode: (id: string, data: any) => void;

    onEdgeUpdate: OnEdgeUpdateFunc;
    onEdgeUpdateStart: () => void;
    onEdgeUpdateEnd: (event: MouseEvent | TouchEvent, edge: Edge) => void;
}

export const useStore = create<FlowStore>((set, get) => ({
    nodes: [...initialNodes],
    edges: [],
    edgeUpdateSuccessful: true,

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

    onEdgeUpdate(oldEdge, newConnection) {
        set({
            edgeUpdateSuccessful: true,
            edges: updateEdge(
                oldEdge, newConnection, get().edges
            )
        });
    },

    onEdgeUpdateStart() {
        set({ edgeUpdateSuccessful: false });
    },

    onEdgeUpdateEnd(_, edge) {
        if (!get().edgeUpdateSuccessful) {
            set({ edges: get().edges.filter((e) => e.id !== edge.id) });
        }

        set({ edgeUpdateSuccessful: true });
    }

}));