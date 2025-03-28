import ERRORSvg from "../assets/error.svg";
import CROSSSvg from "../assets/cross.svg";
import modalStore from "../stores/modalStore";
import errorStore from "../stores/errorStore";
import { useShallow } from "zustand/shallow";
const ErrorModal = () => {
	const popNode = modalStore((s) => s.popNode);
	const selector2 = (state) => ({
		status: state.status,
		message: state.message,
		setStatus: state.setStatus,
		setMsg: state.setMsg
	})
	const { status, message, setStatus, setMsg } = errorStore(useShallow(selector2))

	return (
		<div className="error-modal">
			<div className="title">
				<div>
					<img src={ERRORSvg} alt="SQL SVG" />
					<p>Error</p>
				</div>
				<img src={CROSSSvg} alt="Cross Svg" onClick={(e) => popNode()} />
			</div>
			<h1 id="error-header">{status}</h1>
			<h2 id="error-message">{message}</h2>
		</div>
	)
}

export default ErrorModal