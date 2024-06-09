import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, HandleProps, useNodeId, useStore } from 'reactflow';
import { Overwrite } from '../types/Overwrite';

const selector = (s: any) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

export const CustomHandle = (props: Overwrite<HandleProps, { isConnectable: any }>) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useMemo(() => {
        if (typeof props.isConnectable === 'function') {
            const node = nodeInternals.get(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);

            return props.isConnectable({ node, connectedEdges });
        }

        if (typeof props.isConnectable === 'number') {
            const node = nodeInternals.get(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);

            return connectedEdges.length < props.isConnectable;
        }

        return props.isConnectable;
    }, [nodeInternals, edges, nodeId, props.isConnectable]);

    return (
        <Handle {...props} isConnectable={isHandleConnectable} > </Handle>
    );
};
