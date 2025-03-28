import { useShallow } from "zustand/shallow";
import PROMPTSvg from "../assets/prompt.svg"
import RIGHTArrow from "../assets/right.svg"
import PromptModal from "../modals/PromptModal";
import modalStore from "../stores/modalStore"
import useStore from "../stores/store";
const PromptSelector = ({ id, prompt }) => {
	const selector = (state) => ({
		pushNode: state.pushNode,
		setSourceId: state.setSourceId
	})
	const { pushNode, setSourceId } = modalStore(useShallow(selector));

	const handlePrompts = (e) => {
		setSourceId(id);
		pushNode(PromptModal);
	}

	return (
		<div className="prompt-selector" onClick={(e) => handlePrompts(e)}>
			<div>
				<img src={PROMPTSvg} alt="Prompt svg" />
				<div>
					<h4>
						Answering as
					</h4>
					<p className="values">{prompt}</p>
				</div>
			</div>
			<img src={RIGHTArrow} alt="Prompt svg" />

		</div>
	)
}

export default PromptSelector