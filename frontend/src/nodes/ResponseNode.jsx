import { Handle, Position } from '@xyflow/react';
import { CopyBlock, dracula, a11yDark, a11yLight } from 'react-code-blocks';
import SQLSvg from '../assets/sql.svg';
import STARSvg from '../assets/star.svg';
import TableComponent from '../global-components/TableComponent';
import { BsDisplay } from 'react-icons/bs';
import Graph from '../global-components/Graph';
import flowStore from '../stores/flowStore';
const ResponseNode = ({ data }) => {
    const theme = flowStore((s) => s.theme);
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data, theme);
    const summaryBlock = () => {
        return (
            <div className="summary-block">
                <img
                    src={STARSvg}
                    alt="prompt svg"
                />
                <div>
                    <h3 id="reponse-title">Summary</h3>
                    <div>{data.data.summ}</div>
                </div>
            </div>
        );
    };

    if (data.data.summ.length > 0) {
        console.log(data.data.summ);
    }

    return (
        <div className="node-response">
            {data.data.summ.length > 0 && summaryBlock()}
            {data.data.query && data.data.query.length > 0 && (
                <div className="query-block">
                    <img
                        src={SQLSvg}
                        alt="Sql svg"
                    />
                    <div>
                        <h3 id="response-title">SQL QUERY</h3>
                        <div className="code-block">
                            <CopyBlock
                                language="sql"
                                text={data.data.query}
                                showLineNumbers={false}
                                theme={theme ? a11yLight : a11yDark}
                                codeBlock
                            />
                        </div>
                    </div>
                </div>
            )}
            {data.data.df.length > 0 && (
                <div>
                    <TableComponent df={data.data.df} />
                </div>
            )}
            {Object.keys(data.data.graph).length !== 0 && (
                <Graph data={data.data.graph} />
            )}
            {/* <Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} /> */}

            <Handle
                type="target"
                position="left"
                style={{ opacity: '0' }}
            />
            <Handle
                type="source"
                position="right"
                className="sourceHandle"
                style={{ opacity: '0' }}
            />
        </div>
    );
};

export default ResponseNode;
