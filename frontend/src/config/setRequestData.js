import axios from "axios";

const setRequestData = (component_name, flow_id, data) => {
	switch (component_name) {
		case "sql":
			return ["create_sql_component", {
				"flow_id": flow_id,
				"table_name": data.content
			}, "application/json"]
			break;
		case "csv":
			const formData = new FormData();
			formData.append("file", data.file)
			formData.append("flow_id", flow_id)
			formData.append("header_row", data.header_row)
			return ["component-create-csv", formData, "multipart/form-data"]
			break;
		case "pdf":
			const pdfFormData = new FormData();
			pdfFormData.append("file", data.file)
			pdfFormData.append("flow_id", flow_id)
			pdfFormData.append("processing_type", data.processing_type)
			return ["component-create-pdf", pdfFormData, "multipart/form-data"]
		case "web":
			const webFormData = new FormData();
			webFormData.append("flow_id", flow_id)
			webFormData.append("web_url", data.content)
			return ["component-create-crawl", webFormData, "multipart/form-data"]
			break;
		case "audio":
			const audioFormData = new FormData();
			audioFormData.append("file", data.file)
			audioFormData.append("flow_id", flow_id)
			return ["component-create-audio", audioFormData, "multipart/form-data"]
		case "md":
			const mdFormData = new FormData();
			mdFormData.append("file", data.file)
			mdFormData.append("flow_id", flow_id)
			return ["component-create-md", mdFormData, "multipart/form-data"]
		case "youtube":
			const ytFormData = new FormData();
			ytFormData.append("flow_id", flow_id)
			ytFormData.append("youtube_url", data.content)
			return ["component-create-youtube", ytFormData, "multipart/form-data"]
		case "img":
			const imageFormData = new FormData();
			imageFormData.append("file", data.file)
			imageFormData.append("flow_id", flow_id)
			return ["component-create-img", imageFormData, "multipart/form-data"]
		case "docx":
			const docxFormData = new FormData();
			docxFormData.append("file", data.file)
			docxFormData.append("flow_id", flow_id)
			return ["component-create-docx", docxFormData, "multipart/form-data"]
		case "pptx":
			const pptxFormData = new FormData();
			pptxFormData.append("file", data.file)
			pptxFormData.append("flow_id", flow_id)
			return ["component-create-pptx", pptxFormData, "multipart/form-data"]
		case "html":
			const htmlFormData = new FormData();
			htmlFormData.append("file", data.file)
			htmlFormData.append("flow_id", flow_id)
			return ["component-create-html", htmlFormData, "multipart/form-data"]
		case "txt":
			const txtFormData = new FormData();
			txtFormData.append("file", data.file)
			txtFormData.append("flow_id", flow_id)
			return ["component-create-txt", txtFormData, "multipart/form-data"]
		case "video":
			const videoFormData = new FormData();
			videoFormData.append("file", data.file)
			videoFormData.append("flow_id", flow_id)
			return ["component-create-video", videoFormData, "multipart/form-data"]
	}

}

export default setRequestData