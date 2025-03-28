import AudioSvg from "../assets/audio.svg";
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
const YTModal = () => {
	const selector = (state) => ({
		nodes: state.nodes,
		setNodes: state.setNodes,
		trigger: state.trigger,
		setTrigger: state.setTrigger
	})
	const pushNode = modalStore((s) => s.pushNode)
	const flowId = flowStore((s) => s.flow_id)
	const { nodes, setNodes, trigger, setTrigger } = useStore(useShallow(selector));
	const [url, setUrl] = useState("");
	const popNode = modalStore((s) => s.popNode);
	const addDataSource = (e) => {
		const data = {
			content: url
		}
		pushNode(LoadingModal);
		const [url_hit, body, headerConfig] = setRequestData("youtube", flowId, data);
		console.log("Testtttttt", url_hit, body, headerConfig)
		axios.post(`http://localhost:8000/${url_hit}`, body, {
			headers: {
				'Content-Type': headerConfig
			}
		}).then((res) => manageNodes(res.data))
			.catch((err) => manageErrors(err))
	}

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
			type: "dataSource",
			data: {
				name: data.type,
				content: url,
				flow_id: flowId,
				prompt: "Portfolio Manager"
			},
		}
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
                        src={AudioSvg}
                        alt="SQL SVG"
                    />
                    <p>Connect Youtube</p>
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
                    placeholder: 'https://www.youtube.com/watch?v=iR2O2GPbB0E',
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

export default YTModal