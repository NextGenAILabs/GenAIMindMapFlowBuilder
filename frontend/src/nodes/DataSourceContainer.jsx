import { Handle } from "@xyflow/react"
import DataSource from "./DataSource"
import PromptSelector from "./PromptSelector"
import flowStore from "../stores/flowStore"

const DataSourceContainer = ({ id, data }) => {
	console.log("WHISTLEE", data)
	const flow_type = flowStore((s) => s.flow_type)
	return (
		<div className="data-source-container">
			{flow_type === 'manual' 
			? <PromptSelector id={id} prompt={data.prompt} name={data.name} />
			: null
			}
			<DataSource id={id} data={data} />
			<Handle position="right" type="source" style={{ "marginTop": "2.5rem", "opacity": "0" }} />
		</div>
	)
}

export default DataSourceContainer