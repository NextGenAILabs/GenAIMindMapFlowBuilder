import WEBSvg from "../assets/web.svg";
import { useState } from "react";
import useStore from "../stores/store";
import { useShallow } from "zustand/shallow";
import modalStore from "../stores/modalStore";
import { nanoid } from "nanoid";
import CROSSSvg from "../assets/cross.svg";
import InputBar from "../helpful-components/InputBar";
import flowStore from "../stores/flowStore";
import generateHexId from "../utils/setUpHex";
import LoadingModal from "./LoadingModal";
import setRequestData from "../config/setRequestData";
import axios from "axios";
import DataSourceSelect from "../global-components/DataSourceSelect";
import errorStore from "../stores/errorStore";
import ErrorModal from "./ErrorModal";
import DELETESvg from '../assets/delete.svg';
import { useReactFlow } from '@xyflow/react';
const WEBModal = () => {
	const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        edges: state.edges,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        setViewPort: state.setViewPort
    });
	const pushNode = modalStore((s) => s.pushNode)
	const flowId = flowStore((s) => s.flow_id)
	const {
        trigger,
        setTrigger,
        nodes,
        edges,
        setNodes,
        setEdges,
        setViewPort
    } = useStore(useShallow(selector));
	const [url, setUrl] = useState("");
	const popNode = modalStore((s) => s.popNode);

	const setFlowId = flowStore((s) => s.setFlow);
    const flow_id = flowStore((s) => s.flow_id);
    const setFlowName = flowStore((s) => s.setFlowName);
    const { fitView } = useReactFlow();

	const addDataSource = (e) => {
		const data = {
			content: url
		}
		pushNode(LoadingModal);
		const [url_hit, body, headerConfig] = setRequestData("web", flowId, data);
		console.log("Testtttttt", url_hit, body, headerConfig)
		axios.post(`http://localhost:8000/${url_hit}`, body, {
			headers: {
				'Content-Type': headerConfig
			}
		}).then((res) => setupNodes(res.data))
			.catch((err) => manageErrors(err))
	}

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
	})
	const { status, message, setStatus, setMsg } = errorStore(useShallow(selector2))

	const manageErrors = (err) => {
		console.log(err)
		console.log("Errroro", err.status)
		console.log("Errroross", err.response.statusText)
		setStatus(err.status)
		setMsg(err.response.statusText)
		popNode()
		pushNode(ErrorModal)
	}

	const manageNodes = (data) => {
		const node = {
            id: data.component_id,
            position: { x: 0, y: 0 },
            type: 'dataSource',
            data: {
                name: data.type,
                content: url,
                flow_id: flowId,
                prompt: 'Research Assistant'
            }
        };
		if (nodes.length === 0) {
			setNodes([node]);
		} else {
			const newArr = [...nodes, node]
			setNodes(newArr)
		}
		setTrigger(!trigger)
	}
	return (
        <div className="modal-container">
            <div className="title">
                <div>
                    <img
                        src={WEBSvg}
                        alt="SQL SVG"
                    />
                    <p>Connect Web</p>
                </div>
                <img
                    src={CROSSSvg}
                    alt="Cross Svg"
                    onClick={(e) => popNode()}
                />
            </div>
            <InputBar
                data={{
                    type: 'text',
                    label: 'Enter URL',
                    placeholder: 'https://en.wikipedia.org/wiki/Main_Page',
                    setTableName: setUrl
                }}
            />
            <div className="buttons">
                <button
                    id="cancel"
                    onClick={(e) => pushNode(DataSourceSelect)}
                >
                    Back
                </button>
                {/* <button id="add" style={url ? {opacity: '100%'} : {opacity: '40%'}} onClick={(e) => addDataSource(e)}>Add</button> */}

                {url ? (
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

}

export default WEBModal