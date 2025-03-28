import AddDataSource from '../global-components/AddDataSource';
import DataSourceSet from './DataSourceSet';
import FileUploader from './FileUploader';
import FollowUpQuestionNode from './FollowUpQuestionNode';
import PromptSelector from './PromptSelector';
import QuestionNode from './QuestionNode';
import ResponseNode from './ResponseNode';
// import DataSource from './DataSource';
import DataSourceContainer from './DataSourceContainer';
import ResponsePdf from './ResponsePdf';

const nodeTypes = {
    fileUpload: FileUploader,
    dataSource: DataSourceContainer,
    followUp: FollowUpQuestionNode,
    question: QuestionNode,
    response: ResponseNode,
    dataSourceSet: DataSourceSet,
    addSource: AddDataSource,
    promptSelector: PromptSelector,
    pdfResponse: ResponsePdf
};
export { nodeTypes };
