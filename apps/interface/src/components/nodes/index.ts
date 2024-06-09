import type { Node, NodeTypes } from "reactflow";
import { LLMNode } from "./LLMNode";
import { PlaintextNode } from "./PlaintextNode";

export const initialNodes = [
    { id: 'node-1', type: 'llm', position: { x: 900, y: 400 }, data: undefined },
    { id: 'node-2', type: 'plaintext', position: { x: 400, y: 300 }, data: { title: 'InputTitle', content: 'Content' } },
    { id: 'node-3', type: 'plaintext', position: { x: 1200, y: 300 }, data: { title: 'OutputTitle', content: 'Content' } },
] satisfies Node[];

export const nodeTypes = { llm: LLMNode, plaintext: PlaintextNode } satisfies NodeTypes;