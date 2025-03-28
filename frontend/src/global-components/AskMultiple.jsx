import { useState } from 'react';
import STARSvg from '../assets/star.svg';
import generateHexId from '../utils/setUpHex';
import flowStore from '../stores/flowStore';
import axios from 'axios';
import errorStore from '../stores/errorStore';
import ErrorModal from '../modals/ErrorModal';
import modalStore from '../stores/modalStore';
import { useShallow } from 'zustand/shallow';
import { Position } from '@xyflow/react';
import useCreateEdges from '../hooks/useCreateEdges';
import useStore from '../stores/store';
import LoadingModal from '../modals/LoadingModal';
const AskMultiple = ({ data, selectedNodes }) => {
    const [question, setQuestion] = useState('');
    const flowId = flowStore((s) => s.flow_id);
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        setNodes: state.setNodes,
        edges: state.edges,
        setEdges: state.setEdges
    });
    const { nodes, setNodes, edges, setEdges, trigger, setTrigger } = useStore(
        useShallow(selector)
    );
    const askQuestion = (e) => {
		pushNode(LoadingModal)
        const parentNodes = selectedNodes.map((ele) => ele.data.id);
        const requestData = {
            node_id: generateHexId(),
            question: question,
            flow_id: flowId,
            parent_node_ids: parentNodes
        };
        axios
            .post('http://localhost:8000/multiple-qa-summarize', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => manageNodes(res.data, requestData.node_id))
            .catch((err) => manageErrors(err));
    };

    const manageNodes = (resData, nodeId) => {
        console.log(nodeId);
        const parentNodeId = selectedNodes.map((ele) => ele.id);
        console.log('Super', parentNodeId);
        const newNode = {
            id: generateHexId(),
            type: 'response',
            position: { x: 0, y: 0 },
            data: resData
        };
        const newEdges = [];
        parentNodeId.forEach((element) => {
            edges.push(useCreateEdges(element, newNode.id));
        });
        setNodes([newNode, ...nodes]);
        setEdges([...newEdges, ...edges]);
        setTrigger(!trigger);
    };

    const selector2 = (state) => ({
        status: state.status,
        message: state.message,
        setStatus: state.setStatus,
        setMsg: state.setMsg
    });
    const { status, message, setStatus, setMsg } = errorStore(
        useShallow(selector2)
    );

    const manageErrors = (err) => {
        console.log(err);
        console.log('Errroro', err.status);
        console.log('Errroross', err.response.statusText);
        setStatus(err.status);
        setMsg(err.response.statusText);
        popNode();
        pushNode(ErrorModal);
    };

    const ifPressEnter = (e) => {
        if (e.key === 'Enter') {
            askQuestion();
        } else {
            return;
        }
    };

    return (
        <div
            className={'multiple-class ' + data}
            onKeyDown={(e) => ifPressEnter(e)}
        >
            <div>
                <img
                    src={STARSvg}
                    alt="Star Svg"
                />
                <input
                    type="text"
                    id="multiple-input"
                    placeholder="Ask a Question"
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
        </div>
    );
};

export default AskMultiple;
