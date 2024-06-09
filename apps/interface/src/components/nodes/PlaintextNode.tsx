import { Handle, Position } from "reactflow";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { shallow } from 'zustand/shallow';
import { CustomHandle } from "../flows/CustomHandle";
import { FlowStore, useStore } from "@/store";
import { ChangeEvent } from "react";

const selector = (id: string) => (store: FlowStore) => ({
    setPlaintextTitle: (e: ChangeEvent<HTMLInputElement>) => store.updateNode(id, { title: e.target.value }),
    setPlaintextContent: (e: ChangeEvent<HTMLTextAreaElement>) => store.updateNode(id, { content: e.target.value }),
});

export function PlaintextNode({ id, data, isConnectable }: { id: string, data: { title: string, content: string }, isConnectable: boolean }) {
    const { setPlaintextTitle, setPlaintextContent } = useStore(selector(id), shallow);

    return (
        <>
            <CustomHandle type="target" position={Position.Left} isConnectable={1} />
            <div className='p-4 rounded-md border-black border bg-background w-96 break-words space-y-4'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Title</Label>
                    <Input placeholder="Title" className="nodrag" value={data.title} onChange={setPlaintextTitle} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Content</Label>
                    <Textarea placeholder="Content" className="nodrag" rows={15} value={data.content} onChange={setPlaintextContent} />
                </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </>
    );
}

export const MockPlaintextNode = () => {
    return (<div className="pointer-events-none w-[288px]">
        <div className='p-4 rounded-md border-black border bg-background break-words space-y-4'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Title</Label>
                <Input placeholder="Title" className="nodrag" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Content</Label>
                <Textarea placeholder="Content" className="nodrag" rows={3} />
            </div>
        </div>
    </div>)
}