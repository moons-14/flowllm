import type { Node, NodeTypes } from "reactflow";
import { LLMNode } from "./LLMNode";
import { PlaintextNode } from "./PlaintextNode";


export const nodeTypes = { llm: LLMNode, plaintext: PlaintextNode } satisfies NodeTypes;