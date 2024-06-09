import { Handle, Position } from "reactflow";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { CustomHandle } from "../flows/CustomHandle";

export function PlaintextNode({ data, isConnectable }: { data: { title: string, content: string }, isConnectable: boolean }) {

    const { title, content } = data;
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentContent, setCurrentContent] = useState(content);

    useEffect(() => {
        setCurrentTitle(title);
    }, [title]);
    useEffect(() => {
        setCurrentContent(content);
    }, [content]);

    return (
        <>
            <CustomHandle type="target" position={Position.Left} isConnectable={1} />
            <div className='p-4 rounded-md border-black border bg-background w-96 break-words space-y-4'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Title</Label>
                    <Input placeholder="Title" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>Content</Label>
                    <Textarea placeholder="Content" rows={15} value={currentContent} onChange={(e) => setCurrentContent(e.target.value)} />
                </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </>
    );
}