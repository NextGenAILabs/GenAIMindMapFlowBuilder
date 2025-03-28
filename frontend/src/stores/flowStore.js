import { create } from "zustand";
const flowStore = create((set) => ({
	flow_id: undefined,
	theme: false,
	setTheme: (updTheme) => {
		set({
			theme: updTheme
		})
	},
	setFlow: (id) => {
		console.log("DEBUGGGGGGGGGGGGGGG", id)
		set({
			flow_id: id
		})
	},
	rfInstance: undefined,
	setRfInstance: (e) => {
		set({ rfInstance: e })
	},
	flow_name: undefined,
	setFlowName: (name) => {
		console.log(name)
		set({
			flow_name: name
		})
	},
	flow_summary: undefined,
	setFlowSummary: (summary) => {
		set({
			flow_summary: summary
		})
	},
	flow_type: undefined,
	setFlowType: (type_of_flow) => {
		set({
			flow_type: type_of_flow
		})
	}
}));

export default flowStore;
