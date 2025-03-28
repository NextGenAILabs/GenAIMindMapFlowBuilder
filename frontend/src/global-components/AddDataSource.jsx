import { useShallow } from "zustand/shallow";
import ADDSvg from "../assets/add.svg";
import modalStore from "../stores/modalStore";
import DataSourceSelect from "./DataSourceSelect";
const AddDataSource = () => {
	const selector = (state) => ({
		node: state.node,
		pushNode: state.pushNode,
		popNode: state.popNode
	});
	const { node, pushNode, popNode } = modalStore(useShallow(selector));
	const openDataSourceModel = (e) => {
		if (node) {
			popNode()
		} else {
			pushNode(DataSourceSelect)
		}

	}
	return (
		<div className="add-source" onClick={openDataSourceModel}>
			<img src={ADDSvg} alt="add icon" />
			<p>Add New Source</p>
		</div>
	)
}

export default AddDataSource