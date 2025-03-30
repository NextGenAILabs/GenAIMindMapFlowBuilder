import CSVSvg from "../assets/csv.svg"
import CROSSSvg from "../assets/cross.svg"
import RIGHTArrow from "../assets/right.svg"
import { useState } from "react"
import InputBar from "../helpful-components/InputBar"
import { nanoid } from "nanoid"
import useStore from "../stores/store"
import { useShallow } from "zustand/shallow"
import modalStore from "../stores/modalStore"
import axios from "axios"
import LoadingModal from "./LoadingModal"
import setRequestData from "../config/setRequestData"
import flowStore from "../stores/flowStore"
import DataSourceSet from "../nodes/DataSourceSet"
import DataSourceSelect from "../global-components/DataSourceSelect"
import ErrorModal from "./ErrorModal"
import errorStore from "../stores/errorStore"

const CSVModal = () => {
	const selector = (state) => ({
		trigger: state.trigger,
		setTrigger: state.setTrigger,
		nodes: state.nodes,
		setNodes: state.setNodes
	})
	const flowId = flowStore((s) => s.flow_id)
	const { trigger, setTrigger, nodes, setNodes } = useStore(useShallow(selector));
	const [header_row, setHeaderRow] = useState()
	const [file, setFile] = useState();
	const pushNode = modalStore((s) => s.pushNode);
	const popNode = modalStore((s) => s.popNode);
	const csvAccept = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

	const addDataSource = (e) => {
		const data = {
			file: file,
			header_row: header_row
		}
		pushNode(LoadingModal);
		const [url, body, headerConfig] = setRequestData("csv", flowId, data);
		axios.post(`http://localhost:8000/${url}`, body, {
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
            type: 'dataSource',
            data: {
                name: data.type,
                content: file.name,
                flow_id: flowId,
                prompt: 'Research Assistant',
                file: file,
                header_row: header_row
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


	const handleFileUpload = (e) => {
		setFile(e.target.files[0])
	}

	return (
		<div className="modal-container">
			<div className="title">
				<div>
					<img src={CSVSvg} alt="SQL SVG" />
					<p>Load A CSV</p>
				</div>
				<img src={CROSSSvg} alt="Cross Svg" onClick={(e) => popNode()} />
			</div>
			<div className="data-source-input">
				<label htmlFor="filesUp" className="data-source-set" >
					<div>
						<img src={CSVSvg} alt="image will be here" />
						{/* <p>Upload a CSV</p> */}
						{file ? <p>{file.name}</p> : <p>Upload a CSV</p>}
					</div>
					<img src={RIGHTArrow} alt={"RIght arrow"} />
				</label>
				<input id="filesUp" type="file" accept={csvAccept} style={{ "display": "none" }} onChange={(e) => handleFileUpload(e)} />
			</div>
			<InputBar data={{ type: "number", label: "Enter Column Row", placeholder: "eg: 1", setTableName: setHeaderRow }} />
			<div className="buttons">
				<button id="cancel" onClick={(e) => pushNode(DataSourceSelect)}>Back</button>
				{/* <button id="add" onClick={(e) => addDataSource(e)}>Add</button> */}

				{(file && header_row) ?
					<button id="add" style={{ opacity: '100%' }} onClick={(e) => addDataSource(e)}>Add</button>
					:
					<button id="add" style={{ opacity: '40%' }} disabled>Add</button>
				}
			</div>
		</div>
	)
}

export default CSVModal