/* eslint-disable react/prop-types */
import overLayStore from '../stores/modalStore';
import TICKSvg from "../assets/tick.svg";
import { useShallow } from 'zustand/shallow';
import LoadingModal from '../modals/LoadingModal';
import useStore from '../stores/store';
import useCreatNode from '../hooks/useCreateNodes';
import useCreateEdges from '../hooks/useCreateEdges';
import { nanoid } from 'nanoid';
import axios from 'axios';
import setRequestData from '../config/setRequestData';
import setFollowUp from '../config/setFollowUp';
import { useNodeId } from '@xyflow/react';
import flowStore from '../stores/flowStore';
import getPrompts from '../prompts/promptsModel';
import { useEffect, useState } from 'react';
import ErrorModal from '../modals/ErrorModal';
import errorStore from '../stores/errorStore';
const Prompts = ({ agentName, activeAgent, setActiveAgent, id }) => {
    const selector = (s) => ({ pushNode: s.pushNode, popNode: s.popNode });
    const selector2 = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        edges: state.edges,
        setNodes: state.setNodes,
        setEdges: state.setEdges
    })
    const flowId = flowStore((s) => s.flow_id)
    const { pushNode, popNode } = overLayStore(useShallow(selector));
    const { trigger, setTrigger, nodes, edges, setNodes, setEdges } = useStore(useShallow(selector2));
    const [customPrompt, setCustomPrompt] = useState()
    const makeApiRequest = (data) => {
        const prompts = getPrompts(agentName, customPrompt)
        const dataWithNode = {
            component_id: id,
            component_type: data.name,
            flow_id: data.flow_id,
            ...prompts,
        }
        console.log("dataWithNode", dataWithNode)
        const [url, body, headerConfig] = setFollowUp(data.name, flowId, dataWithNode);
        console.log("Request body:- ", body)
        // const formData =
        // {
        //     "flow_id": "6782c63b567b16ba8889cb71",
        //     "table_name": data.content
        // }
        axios.post(`http://localhost:8000/${url}`, body, {
            headers: {
                'Content-Type': headerConfig
            }
        }).then((res) => manageNodes(res.data))
            .catch((err) => manageErrors(err))
    }

    const selector3 = (state) => ({
        status: state.status,
        message: state.message,
        setStatus: state.setStatus,
        setMsg: state.setMsg
    })
    const { status, message, setStatus, setMsg } = errorStore(useShallow(selector3))

    const manageErrors = (err) => {
        console.log(err)
        console.log("Errroro", err.status)
        console.log("Errroross", err.response.statusText)
        setStatus(err.status)
        setMsg(err.response.statusText)
        popNode()
        pushNode(ErrorModal)
    }


    const getData = () => {
        pushNode(LoadingModal)
        const currNode = nodes.filter((node) => node.id === id)
        const editNode = nodes.find((node) => node.id === id)
        console.log("EDIT NODE", editNode)
        editNode.data.prompt = agentName
        makeApiRequest(currNode[0].data)
        // setTimeout(() => popNode(), 3000)
    }

    const manageNodes = (data) => {
        console.log("Started =====", data)
        const currentNode = nodes.find((node) => node.id === id)
        currentNode.data = {
            prompt: agentName,
            ...currentNode.data
        }
        console.log("manageNodes called")
        // for (let i = 0; i < 3; i++) {
        //     const obj = {
        //         position: { x: currentNode[0].position.x + 400, y: i * 100 },
        //         question: "Hi how are you" + i,
        //         flow_id: "6782c63b567b16ba8889cb71",
        //         ...data
        //     }
        //     resData.push(obj)

        // }
        /* Till Here */
        console.log("Starting Create Nodes============================", data)
        // const updatedNodes = useCreatNode(data);
        // updatedNodes.push({
        //     id: nanoid(),
        //     data: { component_id: data.component_id, flow_id: "6782c63b567b16ba8889cb71", type: data.type },
        //     type: "question",
        //     position: { x: currentNode[0].position.x + 400, y: (resData.length + 1) * 100 }
        // })
        // console.log("Nodes updated" + nodes.concat(updatedNodes))
        setNodes([...nodes, ...data])
        console.log("Creating Edges")
        const newEdges = []
        data.forEach(element => {
            const edge = useCreateEdges(id, element.id);
            newEdges.push(edge)
        });

        const updEdges = edges.concat(newEdges)
        setEdges(updEdges)
        console.log("Setting edges completed")
        setTrigger(!trigger);
    }

    const setCutomPrompt = (e) => {
        setNodes(nodes)
        setActiveAgent(agentName)
    }

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const ifPressEnter = (e) => {
        if (e.key === "Enter") {
            getData();
        }
    }

    console.log("AGGGGGGGGGGGGGGGGGGGGGEEEEEEEEENT", agentName)

    return (
        // <div className='prompt-container' onClick={(e) => activeAgentName(agentName)}>
        <>
            {agentName === "Custom Prompts" ?
                <div className={agentName === activeAgent ? 'prompt-container selected-prompt' : 'prompt-container'} onClick={(e) => setActiveAgent(agentName)} tabIndex={1} onKeyDown={(e) => ifPressEnter(e)}>
                    <img src={TICKSvg} alt="tick svg" style={activeAgent === agentName ? { "opacity": "100%" } : { "opacity": "0" }} />
                    {activeAgent === "Custom Prompts" ?
                        <div className='custom-prompts'>
                            <p className='agent-name'>{agentName}</p>
                            <textarea
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                onInput={handleInput}
                                style={{
                                    minHeight: '50px',
                                    resize: 'none',
                                    overflow: "hidden"
                                }}
                            />
                        </div>
                        : <p className='agent-name'>{agentName}</p>
                    }

                </div>
                :
                <div className={agentName === activeAgent ? 'prompt-container selected-prompt' : 'prompt-container'} onClick={(e) => getData(e)}>
                    <img src={TICKSvg} alt="tick svg" style={activeAgent === agentName ? { "opacity": "100%" } : { "opacity": "0" }} />
                    <p className='agent-name'>{agentName}</p>
                </div>
            }
        </>
    );
};

export default Prompts;
