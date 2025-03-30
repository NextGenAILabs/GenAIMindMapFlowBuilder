import MDSvg from '../assets/md.svg';
import CROSSSvg from '../assets/cross.svg';
import RIGHTArrow from '../assets/right.svg';
import { useState } from 'react';
import InputBar from '../helpful-components/InputBar';
import { nanoid } from 'nanoid';
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore';
import axios from 'axios';
import LoadingModal from './LoadingModal';
import setRequestData from '../config/setRequestData';
import flowStore from '../stores/flowStore';
import DataSourceSet from '../nodes/DataSourceSet';
import DataSourceSelect from '../global-components/DataSourceSelect';
import ErrorModal from './ErrorModal';
import errorStore from '../stores/errorStore';
import DELETESvg from '../assets/delete.svg';
import { useReactFlow } from '@xyflow/react';

const MDModal = () => {
    const flowId = flowStore((s) => s.flow_id);
    const [file, setFile] = useState();
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    // const csvAccept = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    const markdownAccept = 'text/markdown';
    const setFlowId = flowStore((s) => s.setFlow);
    const flow_id = flowStore((s) => s.flow_id);
    const setFlowName = flowStore((s) => s.setFlowName);
    const { fitView } = useReactFlow();
    const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        edges: state.edges,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        setViewPort: state.setViewPort
    });

    const {
        trigger,
        setTrigger,
        nodes,
        edges,
        setNodes,
        setEdges,
        setViewPort
    } = useStore(useShallow(selector));




    const addDataSource = (e) => {
        const data = {
            file: file,
        };
        pushNode(LoadingModal);
        const [url, body, headerConfig] = setRequestData('md', flowId, data);
        axios
            .post(`http://localhost:8000/${url}`, body, {
                headers: {
                    'Content-Type': headerConfig
                }
            })
            .then((res) => setupNodes(res.data))
            .catch((err) => manageErrors(err));
    };

    const setupNodes = (data) => {
        if (data.flow_type === 'automatic') {
            manageAutomaticNode(data)
        } else {
            manageNodes(data)
        }
    }

    const manageAutomaticNode = (data) => {
        setupFlow(data)
    }
    const setupFlow = (data) => {
        console.log("SETUUUUUUUUUUUUUUUUUUP new flow")
        pushNode(LoadingModal);
        setFlowId(data.flow_id);
        console.log('DEDEDE', data);
        setFlowName(data.flow_name);
        const jsonString = JSON.stringify(data.mindmap_json)
        console.log(jsonString, "JSON STRINGGGGGGGGGGGGGG")
        if (jsonString.length > 0) {
            const flow = JSON.parse(jsonString);
            console.log('NODEEEEEEEEEE', flow.nodes);
            if (flow.nodes.length === 0 && flow.edges.length === 0) {
                console.log('not clled');
                setTrigger(!trigger);
                setViewPort(0, 0, 1);
                popNode();
            }
            if (flow) {
                const { x = 0, y = 0, zoom = 1.25 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewPort(x, y, zoom);
                // fitView();
                console.log(
                    'FLow selecteed sadassssssssssssssssssssss',
                    flow_id,
                    data.flow_id,
                    nodes
                );
            } else {
                console.log('Flow error');
            }
        } else {
            setNodes([]);
            setEdges([]);
            // setViewPort({});
            fitView();
            popNode();
        }
        // setTrigger(!trigger);
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

    const manageNodes = (data) => {
        const node = {
            id: data.component_id,
            position: { x: 0, y: 0 },
            type: 'dataSource',
            data: {
                name: data.type,
                content: file.name,
                flow_id: flowId,
                prompt: 'Research Assistant',
                file: file
            }
        };
        if (nodes.length === 0) {
            setNodes([node]);
        } else {
            const newArr = [...nodes, node];
            setNodes(newArr);
        }

        setTrigger(!trigger);
    };

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setProcessingType(e.target.value);
    };

    return (
        <div className="modal-container">
            <div className="title">
                <div>
                    <img
                        src={MDSvg}
                        alt="SQL SVG"
                    />
                    <p>Load A Markdown</p>
                </div>
                <img
                    src={CROSSSvg}
                    alt="Cross Svg"
                    onClick={(e) => popNode()}
                />
            </div>
            <div className="data-source-input">
                <label
                    htmlFor="filesUp"
                    className="data-source-set"
                >
                    <div>
                        <img
                            src={MDSvg}
                            alt="image will be here"
                        />
                        {/* <p>Upload a CSV</p> */}
                        {file ? <p>{file.name}</p> : <p>Upload a Markdown File</p>}
                    </div>
                    <img
                        src={RIGHTArrow}
                        alt={'RIght arrow'}
                    />
                </label>
                <input
                    id="filesUp"
                    type="file"
                    accept={markdownAccept}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e)}
                />
            </div>
            <div className="buttons">
                <button
                    id="cancel"
                    onClick={(e) => pushNode(DataSourceSelect)}
                >
                    Back
                </button>
                {/* <button id="add" onClick={(e) => addDataSource(e)}>Add</button> */}

                {file ? (
                    <button
                        id="add"
                        style={{ opacity: '100%' }}
                        onClick={(e) => addDataSource(e)}
                    >
                        Add
                    </button>
                ) : (
                    <button
                        id="add"
                        style={{ opacity: '40%' }}
                        disabled
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default MDModal;
