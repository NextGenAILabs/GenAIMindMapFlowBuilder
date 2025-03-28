import STARSvg from "../assets/star.svg"
import { Handle } from "@xyflow/react"
import { Position } from "@xyflow/react"
const ResponsePdf = ({ data }) => {
	return (
		<div className="node-response">
			<div className="summary-block">
				<img src={STARSvg} alt="prompt svg" />
				<div>
					<h3 id="reponse-title">Summary</h3>
					<div>{data.answer}</div>
				</div>
				<Handle type="target" position={Position.right} />
				<Handle type="source" position={Position.left} />

			</div>
		</div>
	)
}

export default ResponsePdf