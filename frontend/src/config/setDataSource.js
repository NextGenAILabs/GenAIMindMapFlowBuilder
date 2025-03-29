import CSVSvg from "../assets/csv.svg";
import SQLSvg from "../assets/sql.svg";
import PDFSvg from "../assets/pdf.svg"
import WEBSvg from "../assets/web.svg"
import AudioSvg from "../assets/audio.svg"
import IMGSvg from '../assets/img.svg';
import MDSvg from "../assets/md.svg"
import HTMLSvg from "../assets/html.svg"
import DOCXSvg from "../assets/docx.svg"
import PPTXSvg from "../assets/pptx.svg"
import TXTSvg from "../assets/text.svg"
import VIDEOSvg from "../assets/video.svg"
import YOUTUBESvg from "../assets/youtube.svg"

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
				img: YOUTUBESvg,
				title: "Source",
				content: data.content
			}
		case ("img"):
			return {
				img: IMGSvg,
				title: "Source",
				content: data.content
			}
		case ("docx"):
			return {
				img: DOCXSvg,
				title: "Source",
				content: data.content
			}
		case ("pptx"):
			return {
				img: PPTXSvg,
				title: "source",
				content: data.content
			}
		case ("txt"):
			return {
				img: TXTSvg,
				title: "source",
				content: data.content
			}
		case ("html"):
			return {
				img: HTMLSvg,
				title: "source",
				content: data.content
			}
		case ("video"):
			return {
				img: VIDEOSvg,
				title: "source",
				content: data.content
			}
		default:
	}
}

export default setDataSource