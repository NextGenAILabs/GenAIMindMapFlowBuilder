import DataSourceSet from "../nodes/DataSourceSet";
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
import flowStore from "../stores/flowStore";
const DataSourceSelect = () => {
	const flow_type = flowStore((s) => s.flow_type)
	return (
		< div className="data-source-selector" >
			<h5>CHOOSE YOUR STARTING POINT</h5>
			<div className="data-source-select-container">
				{flow_type === 'manual' 
				? (
				<>
					<DataSourceSet data={{ img: CSVSvg, content: "CSV", name: "csv" }} />
					<DataSourceSet data={{ img: SQLSvg, content: "Connect SQL", name: "sql" }} />
				</>
				) 
				: null
				}
				<DataSourceSet data={{ img: PDFSvg, content: "PDF", name: "pdf" }} />
				<DataSourceSet data={{ img: WEBSvg, content: "Enter Url", name: "web" }} />
				<DataSourceSet data={{ img: AudioSvg, content: "Select Audio File", name: "audio" }} />
				<DataSourceSet data={{ img: MDSvg, content: "Select MD File", name: "md" }} />
				<DataSourceSet data={{ img: YOUTUBESvg, content: "Connect Youtube", name: 'youtube' }} />
				<DataSourceSet data={{ img: IMGSvg, content: "Select Image file ", name: 'img' }} />
				<DataSourceSet data={{ img: DOCXSvg, content: "Select Docx file ", name: 'docx' }} />
				<DataSourceSet data={{ img: PPTXSvg, content: "Select PPTX file ", name: 'pptx' }} />
				<DataSourceSet data={{ img: HTMLSvg, content: "Select HTML file ", name: 'html' }} />
				<DataSourceSet data={{ img: TXTSvg, content: "Select TEXT file ", name: 'txt' }} />
				<DataSourceSet data={{ img: VIDEOSvg, content: "Select VIDEO file ", name: 'video' }} />
			</div>
		</div >
	)

}

export default DataSourceSelect