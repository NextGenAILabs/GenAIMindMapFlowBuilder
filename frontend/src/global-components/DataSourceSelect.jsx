import DataSourceSet from "../nodes/DataSourceSet";
import CSVSvg from "../assets/csv.svg";
import SQLSvg from "../assets/sql.svg";
import PDFSvg from "../assets/pdf.svg"
import WEBSvg from "../assets/web.svg"
import AudioSvg from "../assets/audio.svg"
import MDSvg from "../assets/md.svg"
const DataSourceSelect = () => {
	return (
		< div className="data-source-selector" >
			<h5>CHOOSE YOUR STARTING POINT</h5>
			<div className="data-source-select-container">
				<DataSourceSet data={{ img: CSVSvg, content: "CSV", name: "csv" }} />
				<DataSourceSet data={{ img: SQLSvg, content: "Connect SQL", name: "sql" }} />
				<DataSourceSet data={{ img: PDFSvg, content: "PDF", name: "pdf" }} />
				<DataSourceSet data={{ img: WEBSvg, content: "Enter Url", name: "web" }} />
				<DataSourceSet data={{ img: AudioSvg, content: "Select Audio File", name: "audio" }} />
				<DataSourceSet data={{ img: MDSvg, content: "Select MD File", name: "md" }} />
				<DataSourceSet data={{ img: AudioSvg, content: "Connect Youtube", name: 'youtube' }} />
				<DataSourceSet data={{ img: MDSvg, content: "Select Image file ", name: 'img' }} />
				<DataSourceSet data={{ img: PDFSvg, content: "Select Docx file ", name: 'docx' }} />
				<DataSourceSet data={{ img: PDFSvg, content: "Select PPTX file ", name: 'pptx' }} />
				<DataSourceSet data={{ img: PDFSvg, content: "Select HTML file ", name: 'html' }} />
				<DataSourceSet data={{ img: PDFSvg, content: "Select TEXT file ", name: 'txt' }} />
				<DataSourceSet data={{ img: PDFSvg, content: "Select VIDEO file ", name: 'video' }} />
			</div>
		</div >
	)

}

export default DataSourceSelect