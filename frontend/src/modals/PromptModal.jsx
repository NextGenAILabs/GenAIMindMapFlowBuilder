import PROMPTSvg from "../assets/prompt.svg"
import CROSSSvg from "../assets/cross.svg"
import Prompts from "../global-components/Prompts"
import { useState } from "react"
import modalStore from "../stores/modalStore"
import { useShallow } from "zustand/shallow"
const PromptModal = () => {
	const selector = (state) => ({
		popNode: state.popNode,
		pushNode: state.pushNode,
		setSourceId: state.setSourceId,
		sourceId: state.sourceId
	})
	const { popNode, pushNode, setSourceId, sourceId } = modalStore(useShallow(selector));
	console.log("impo +", sourceId)
	const [activeAgent, setActiveAgent] = useState("Portfolio Manager")
	return (
		<div className="modal-container prompts-selection">
			<div className="title">
				<div>
					<img src={PROMPTSvg} alt="Prompts Svg" />
					<p>Choose Agent</p>
				</div>
				<img src={CROSSSvg} alt="Cross Svg" onClick={(e) => popNode()} />
			</div>
			<div className="prompts">
				<Prompts agentName={"Portfolio Manager"} activeAgent={activeAgent} setActiveAgent={setActiveAgent} id={sourceId} />
				<Prompts agentName={"Compliance Officer"} activeAgent={activeAgent} setActiveAgent={setActiveAgent} id={sourceId} />
				<Prompts agentName={"Credit Manager"} activeAgent={activeAgent} setActiveAgent={setActiveAgent} id={sourceId} />
				<Prompts agentName={"Project Manager"} activeAgent={activeAgent} setActiveAgent={setActiveAgent} id={sourceId} />
				<Prompts agentName={"Custom Prompts"} activeAgent={activeAgent} setActiveAgent={setActiveAgent} id={sourceId} />
			</div>

		</div>
	)
}

export default PromptModal