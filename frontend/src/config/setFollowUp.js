
const setFollowUp = (component_name, flow_id, data) => {
	return ["components-follow-up-questions", {
		"flow_id": flow_id,
		"component_id": data.component_id,
		"component_type": data.component_type,
		"instructions": data.instructions,
		"model_name": data.model_name,
		"persona_name": data.persona_name,
		"temperature": data.temperature,
		"top_p": data.top_p
	}, "application/json"]

}

export default setFollowUp