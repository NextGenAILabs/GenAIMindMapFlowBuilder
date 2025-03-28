import AudioModal from '../modals/AudioModal.jsx';
import CSVModal from '../modals/CSVModal.jsx';
import ImgModal from '../modals/ImgModal.jsx';
import MDModal from '../modals/MDModal.jsx';
import PDFModal from '../modals/PDFModal.jsx';
import SQLModal from '../modals/SQLModal.jsx';
import WEBModal from '../modals/WEBModal.jsx';
import YTModal from '../modals/YTModal.jsx';
import DocxModal from '../modals/DocxModal.jsx';
import PPTXModal from '../modals/PPTXModal.jsx';
import HTMLModal from '../modals/HTMLModal.jsx';
import TextModal from '../modals/TextModal.jsx';
import VideoModal from '../modals/VideoModal.jsx';
import FlowModal from '../modals/FlowModal.jsx';

const setDataSourceModal = (name, pushNode) => {
    switch (name) {
        case 'sql':
            pushNode(SQLModal);
            break;
        case 'csv':
            pushNode(CSVModal);
            break;
        case 'web':
            pushNode(WEBModal);
            break;
        case 'pdf':
            pushNode(PDFModal);
            break;
        case 'audio':
            pushNode(AudioModal);
            break;
        case 'md':
            pushNode(MDModal);
            break;
        case 'youtube':
            pushNode(YTModal);
            break;
        case 'img':
            pushNode(ImgModal);
            break;
        case 'docx':
            pushNode(DocxModal);
            break;
        case 'pptx':
            pushNode(PPTXModal);
            break;
        case 'html':
            pushNode(HTMLModal);
            break;
        case 'txt':
            pushNode(TextModal);
            break;
        case 'video':
            pushNode(VideoModal);
            break;
        default:
            console.log('In-progress');
    }
};

export default setDataSourceModal;
