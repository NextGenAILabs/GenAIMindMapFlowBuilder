import SQLSvg from "../assets/sql.svg"
import CSVSvg from "../assets/csv.svg"
import PDFSvg from "../assets/pdf.svg"
import WEBSvg from "../assets/web.svg"
import AudioSvg from "../assets/audio.svg"
import MDSvg from "../assets/md.svg"

const setDataSource = (data) => {
	switch (data.name) {
		case ("sql"):
			return {
				img: SQLSvg,
				title: "Enter Table Name",
				content: data.content
			}
			break;
		case ("csv"):
			return {
				img: CSVSvg,
				title: "Source",
				content: data.content
			}
		case ("pdf"):
			return {
				img: PDFSvg,
				title: "Source",
				content: data.content
			}
		case ("web"):
			return {
				img: WEBSvg,
				title: "Url",
				content: data.content
			}
		case ("audio"):
			return {
				img: AudioSvg,
				title: "Source",
				content: data.content
			}
		case ("md"):
			return {
				img: MDSvg,
				title: "Source",
				content: data.content
			}
		case ("youtube"):
			return {
				img: AudioSvg,
				title: "Source",
				content: data.content
			}
		case ("image"):
			return {
				img: MDSvg,
				title: "Source",
				content: data.content
			}
		case ("docx"):
			return {
				img: PDFSvg,
				title: "Source",
				content: data.content
			}
		case ("pptx"):
			return {
				img: PDFSvg,
				title: "source",
				content: data.content
			}
		case ("txt"):
			return {
				img: PDFSvg,
				title: "source",
				content: data.content
			}
		case ("html"):
			return {
				img: PDFSvg,
				title: "source",
				content: data.content
			}
		case ("video"):
			return {
				img: PDFSvg,
				title: "source",
				content: data.content
			}
		default:
	}
}

export default setDataSource