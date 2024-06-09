import { Handle, Position } from "reactflow";
import { Button } from "../ui/button";
import { Play, StepForward } from "lucide-react";
import { FlowStore, useStore } from "@/store";
import { shallow } from "zustand/shallow";

const selector = (store: FlowStore) => ({
    llmSingleRun: store.llmSingleRun,
});

export function LLMNode({ id, isConnectable }: { id: string, isConnectable: boolean }) {
    const store = useStore(selector, shallow);

    return (
        <>
            <Handle type="target" id="llm-target-system" style={{ top: 20 }} position={Position.Left} isConnectable={isConnectable} />
            <Handle type="target" id="llm-target-text" style={{ bottom: 15, top: 'auto' }} position={Position.Left} isConnectable={isConnectable} />
            <div className='p-4 rounded-md border-black border bg-background w-48'>
                <div className='text-lg font-bold text-center'>LLM</div>
                <div className='flex items-center justify-between px-4 py-2 text-primary'>
                    <Button variant="ghost" size="icon" onClick={() => { store.llmSingleRun(id) }}>
                        <Play />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <StepForward />
                    </Button>
                </div>
            </div>
            <Handle type="source" id="llm-source-system" style={{ top: 20 }} position={Position.Right} isConnectable={isConnectable} />
            <Handle type="source" id="llm-source-text" style={{ bottom: 15, top: 'auto' }} position={Position.Right} isConnectable={isConnectable} />
        </>
    );
}

export const MockLLMNode = () => {
    return (<div className="pointer-events-none w-48">
        <div className='p-4 rounded-md border-black border bg-background w-48'>
            <div className='text-lg font-bold text-center'>LLM</div>
            <div className='flex items-center justify-between px-4 py-2 text-primary'>
                <Button variant="ghost" size="icon">
                    <Play />
                </Button>
                <Button variant="ghost" size="icon">
                    <StepForward />
                </Button>
            </div>
        </div>
    </div>)
}