import { Handle } from "@xyflow/react"
import DataSource from "./DataSource"
import PromptSelector from "./PromptSelector"

const DataSourceContainer = ({ id, data }) => {
	console.log("WHISTLEE", data)
	return (
		<div className="data-source-container">
			<PromptSelector id={id} prompt={data.prompt} name={data.name} />
			<DataSource id={id} data={data} />
			<Handle position="right" type="source" style={{ "marginTop": "2.5rem", "opacity": "0" }} />
		</div>
	)
}

export default DataSourceContainer