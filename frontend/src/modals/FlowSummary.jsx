import STARSvg from '../assets/star.svg';
import CROSSSvg from '../assets/cross.svg';
import flowStore from '../stores/flowStore';
import modalStore from '../stores/modalStore';
import TableComponent from '../global-components/TableComponent';
import Graph from '../global-components/Graph';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css';
import {
    AllCommunityModule,
    ModuleRegistry,
    PopupComponent
} from 'ag-grid-community';
import { alignProperty } from '@mui/material/styles/cssUtils';
import Plot from 'react-plotly.js';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { colorSchemeLightWarm } from 'ag-grid-community';
import { themeAlpine } from 'ag-grid-community';
import ReactJsxParser from 'react-jsx-parser';
import DOWNLOADSvg from '../assets/download_img.svg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
const FlowSummary = () => {
    const flowSummary = flowStore((s) => s.flow_summary);
    const popNode = modalStore((s) => s.popNode);
    // const data = JSON.parse(flowSummary);
    console.log('LOOKING FOR THIS', flowSummary);
    const myTheme = themeAlpine.withPart(colorSchemeLightWarm);
    const flow_name = flowStore((s) => s.flow_name);
    {
        /* <div className="flow-summary">
                <div className="title">
                    <div>
                        <img
                            src={STARSvg}
                            alt="SQL SVG"
                        />
                        <p>Flow Summary</p>
                    </div>
                    <img
                        src={CROSSSvg}
                        alt="Cross Svg"
                        onClick={(e) => popNode()}
                    />
                </div>
                <div className="flow-summary-content">
                    {data.summary_text.length > 0 ? (
                        <div className="summary-block">
                            <img
                                src={STARSvg}
                                alt="prompt svg"
                            />
                            <div>
                                <h3 id="reponse-title">Summary</h3>
                                <div>{data.summary_text}</div>
                            </div>
                        </div>
                    ) : (
                        <div> No Summary Found </div>
                    )}
                    {data.dataframe.length > 0 && (
                        <div>
                            <TableComponent df={data.dataframe} />
                        </div>
                    )}
                    {data.plotly_code.length > 0 && (
                        <div>
                            <Graph data={data.plotly_code} />
                        </div>
                    )}
                </div>
            </div> */
    }

    const downloadPdf = (e) => {
        const input = document.querySelector('.jsx-parser'); // Select div by class name
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Adjust width to fit A4 page
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`${flow_name} + Report.pdf`);
        });
    };

    return (
        <div className="flow-summary-modal node-response">
            <div className="title">
                <div>
                    <img
                        src={STARSvg}
                        alt="SQL SVG"
                    />
                    <p>Summary</p>
                </div>
                <div style={{display: 'flex', gap: '0.25rem'}}>
                    <img
                        src={DOWNLOADSvg}
                        alt="Download SVG"
                        onClick={(e) => downloadPdf(e)}
                    />
                    <img
                        src={CROSSSvg}
                        alt="Cross Svg"
                        onClick={(e) => popNode()}
                    />
                </div>
            </div>
            <div
                className="flow-summary"
                style={{ width: '100%' }}
            >
                <ReactJsxParser
                    bindings={{}}
                    components={{ AgGridReact, Plot }}
                    jsx={flowSummary}
                />
            </div>
        </div>
    );
};

export default FlowSummary;
