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
	const [activeAgent, setActiveAgent] = useState('Strategic Advisor');
	return (
        <div className="modal-container prompts-selection">
            <div className="title">
                <div>
                    <img
                        src={PROMPTSvg}
                        alt="Prompts Svg"
                    />
                    <p>Choose Agent</p>
                </div>
                <img
                    src={CROSSSvg}
                    alt="Cross Svg"
                    onClick={(e) => popNode()}
                />
            </div>
            <div className="prompts">
                <Prompts
                    agentName={'Strategic Advisor'}
                    activeAgent={activeAgent}
                    setActiveAgent={setActiveAgent}
                    id={sourceId}
                />
                <Prompts
                    agentName={'Research Assistant'}
                    activeAgent={activeAgent}
                    setActiveAgent={setActiveAgent}
                    id={sourceId}
                />
                <Prompts
                    agentName={'Productivity Coach'}
                    activeAgent={activeAgent}
                    setActiveAgent={setActiveAgent}
                    id={sourceId}
                />
                <Prompts
                    agentName={'Data Interpreter'}
                    activeAgent={activeAgent}
                    setActiveAgent={setActiveAgent}
                    id={sourceId}
                />
                <Prompts
                    agentName={'Custom Prompts'}
                    activeAgent={activeAgent}
                    setActiveAgent={setActiveAgent}
                    id={sourceId}
                />
            </div>
        </div>
    );
}

export default PromptModal