import { Handle, useConnection, useReactFlow } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import axios from 'axios';
import STARSvg from '../assets/star.svg';
import modalStore from '../stores/modalStore';
import LoadingModal from '../modals/LoadingModal';
import { useNodeConnections } from '@xyflow/react';
import { getOutgoers } from '@xyflow/react';
import setQuestionApi from '../config/setQuestionApi';
import flowStore from '../stores/flowStore';
import generateHexId from '../utils/setUpHex';
import errorStore from '../stores/errorStore';
import ErrorModal from '../modals/ErrorModal';

const QuestionNode = ({ id, position, data  }) => {
    console.log('HERE QUESTION NODE', data, position, id);
    const { deleteElements } = useReactFlow();
    const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        setNodes: state.setNodes,
        edges: state.edges,
        setEdges: state.setEdges
    });
    const connections = useNodeConnections({
        type: 'source'
    });
    const { nodes, setNodes, edges, setEdges, trigger, setTrigger } = useStore(
        useShallow(selector)
    );
    const currNodeObj = nodes.find((ele) => ele.id === id);
    console.log('ASSSKSKSK QUESTION', currNodeObj);
    const [question, setQuestion] = useState(() => {
        const initialValue = '';
        return currNodeObj.data.question
            ? currNodeObj.data.question
            : initialValue;
    });
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    const flowId = flowStore((s) => s.flow_id);

    const deleteFollowUpQuestion = (component_id) => {
        const followUpNodes = nodes.filter(
            (ele) =>
                ele.data.component_id === component_id &&
                ele.type === 'followUp'
        );
        const responseNodesAns = nodes
            .filter((item) => item.type === 'response')
            .map((ele) => ele.data.id);
        const followUpIds = followUpNodes.map((ele) => ele.id);
        console.log('Compare this', followUpIds, responseNodesAns);
        const commonId = responseNodesAns.filter((id) =>
            followUpIds.includes(id)
        );
        console.log('Determine', commonId);
        const deleteNodes = followUpNodes.filter(
            (obj) => !commonId.includes(obj.id)
        );
        // console.log("FollowUpNodesAnswere", followUpNodeAnswere)
        deleteNodes.forEach(({ id }) => {
            deleteElements({ nodes: [{ id }] });
        });
        console.log('Deleted followUpNodes', deleteNodes);
    };

    const setResponse = (resData) => {
        console.log('HEre is response', resData);
        const currNode = nodes.filter((node) => node.id === id);
        if (!currNode) return 'Node not found';
        let node;
        node = {
            id: generateHexId(),
            data: resData[0],
            type: 'response',
            position: {
                x: currNode[0].position.x + 500,
                y: currNode[0].position.y
            },
            deletable: true
        };
        const questionNode = {
            id: resData[1].id,
            type: 'question',
            data: {
                question: resData[1].data.question,
                component_type: resData[1].data.component_type,
                component_id: resData[1].data.component_id
            },
            position: {
                x: currNode[0].position.x + 500,
                y: currNode[0].position.y
            },
            deletable: true
        };
        setNodes([node, questionNode, ...nodes]);
        deleteFollowUpQuestion(resData[1].data.component_id);
        const edge = {
            id: generateHexId(),
            source: id,
            target: node.id,
            animated: true
        };
        const edge2 = {
            id: generateHexId(),
            source: resData[1].data.component_id,
            target: resData[1].id,
            animated: true
        };
        setEdges([edge, edge2, ...edges]);
        setTrigger(!trigger);
    };

    useEffect(() => {
        console.log(question);
    }, [question]);

    const askQuestion = () => {
        console.log('THIS IS A TEST', data);
        const [url, body, config] = setQuestionApi(
            data.component_type,
            flowId,
            data,
            question,
            id,
            'question'
        );
        axios
            .post(`http://localhost:8000/${url}`, body, config)
            .then((res) => setResponse(res.data))
            .catch((err) => manageErrors(err));
        // 	const formData = new FormData();
        // 	const dataString = {
        // 		component_id: data.component_id,
        // 		flow_id: data.flow_id,
        // 		question: question
        // 	}
        // 	console.log(dataString)

        // 	axios.post("http://localhost:8000/sql-component-qa", dataString, {
        // 		headers: {
        // 			// 'Content-Type': 'multipart/form-data'
        // 			'Content-Type': 'application/json'
        // 		}
        // 	}).then((res) => setResponse(res.data))
        // 		.catch((err) => console.log(err))
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
        if (question.length === 0) {
            return;
        }
        if (e.key === 'Enter') {
            const currentNode = nodes.find((ele) => ele.id === id);
            currentNode.data.question = question;
            setNodes(nodes);
            pushNode(LoadingModal);
            askQuestion();
        }
    };

    const handleInput = (e) => {
        const currentNode = nodes.find((ele) => ele.id === id);
        const textarea = e.target;
        textarea.style.height = '';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div
            className="node-question"
            tabIndex={1}
            onKeyDown={(e) => ifPressEnter(e)}
        >
            <img
                src={STARSvg}
                alt="Star svg"
            />
            {currNodeObj ? (
                currNodeObj.data.question ? (
                    <textarea
                        className=".question-textarea"
                        placeholder="Ask a Question"
                        disabled
                        onInput={handleInput}
                        defaultValue={currNodeObj.data.question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={{
                            overflow: 'hidden',
                        }}
                    />
                ) : (
                    <textarea
                        className=".question-textarea"
                        placeholder="Ask a Question"
                        onInput={handleInput}
                        defaultValue={currNodeObj.data.question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={{
                            overflow: 'hidden',
                        }}
                    />
                )
            ) : (
                <input
                    type="text"
                    placeholder="Ask Question"
                    onChange={(e) => setQuestion(e.target.value)}
                />
            )}
            <Handle
                type="source"
                position="right"
                style={{ opacity: '0' }}
            />
            <Handle
                type="target"
                position="left"
                style={{ opacity: '0' }}
            />
        </div>
    );
};

export default QuestionNode;
