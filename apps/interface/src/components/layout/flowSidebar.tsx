import React, { DragEvent } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Image from 'next/image';
import { MockLLMNode } from '../nodes/LLMNode';
import { MockPlaintextNode } from '../nodes/PlaintextNode';

export const FlowSidebar = ({ ...props }) => {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside {...props} className='p-4 w-80'>
            <div className="text-xl font-medium text-center my-5">Nodes</div>
            <Accordion type="multiple" value={["llm", "text"]}>
                <AccordionItem value="llm">
                    <AccordionTrigger>LLM Node</AccordionTrigger>
                    <AccordionContent>
                        <div className='h-46 dndnode' onDragStart={(event) => onDragStart(event, 'llm')} draggable>
                            <div className=' flex justify-center'>
                                <MockLLMNode />
                            </div>
                            <div className='text-center '>LLM</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="text">
                    <AccordionTrigger>Text Node</AccordionTrigger>
                    <AccordionContent>
                        <div className='h-46 dndnode' onDragStart={(event) => onDragStart(event, 'plaintext')} draggable>
                            <div className='flex justify-center'>
                                <MockPlaintextNode />
                            </div>
                            <div className='text-center '>Plaintext</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    );
};