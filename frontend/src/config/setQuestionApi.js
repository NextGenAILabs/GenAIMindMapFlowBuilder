const setQuestionApi = (component_name, flow_id, data, question, node_id, queryType) => {
	switch (component_name) {
		case "sql":
			return ["sql-component-qa", {
				"flow_id": flow_id,
				"question": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "csv":
			return ["csv-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "pdf":
			return ["pdf-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "web":
			return ["web-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "audio":
			return ["audio-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
		case "md":
			return ["md-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
		case "youtube":
			return ["youtube-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
		case "image":
			return ["img-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "docx":
			return ["docx-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "pptx":
			return ["pptx-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "html":
			return ["html-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "txt":
			return ["txt-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
		case "video":
			return ["video-component-qa", {
				"flow_id": flow_id,
				"query": question,
				"component_id": data.component_id,
				"node_id": node_id,
				"request_type": queryType
			}, "application/json"]
			break;
	}

}

export default setQuestionApi