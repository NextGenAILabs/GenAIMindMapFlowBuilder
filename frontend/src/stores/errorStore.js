import { create } from "zustand";
const errorStore = create((set) => ({
	status: undefined,
	setStatus: (st) => {
		set({
			status: st
		})
	},
	message: undefined,
	setMsg: (msg) => {
		set({
			message: msg
		})
	}

}));

export default errorStore