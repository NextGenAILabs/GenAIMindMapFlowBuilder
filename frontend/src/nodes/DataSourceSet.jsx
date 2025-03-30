import { useShallow } from 'zustand/shallow';
import RIGHTArrow from '../assets/right.svg';
import setDataSourceModal from '../config/setDataSourceModal';
import modalStore from '../stores/modalStore';
import useStore from '../stores/store';
import LoadingModal from '../modals/LoadingModal';
import setRequestData from '../config/setRequestData';
import axios from 'axios';
import { useState } from 'react';
import flowStore from '../stores/flowStore';
import errorStore from '../stores/errorStore';
import ErrorModal from '../modals/ErrorModal';

const DataSourceSet = ({ data }) => {
    // Used when to set Data Source
    const pushNode = modalStore((s) => s.pushNode);
    const flowId = flowStore((s) => s.flow_id);
    const popNode = modalStore((s) => s.popNode);
    const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        setNodes: state.setNodes
    });
    const { trigger, setTrigger, nodes, setNodes } = useStore(
        useShallow(selector)
    );

    const handleFileUpload = (e) => {
        pushNode(LoadingModal);
        const data = {
            file: e.target.files[0]
        };
        const [url, body, headerConfig] = setRequestData('pdf', flowId, data);
        axios
            .post(`http://localhost:8000/${url}`, body, {
                headers: {
                    'Content-Type': headerConfig
                }
            })
            .then((res) => manageNodes(res.data, e.target.files[0]))
            .catch((err) => manageErrors(err));
    };

    const selector2 = (state) => ({
        status: state.status,
        message: state.message,
        setStatus: state.setStatus,
        setMsg: state.setMsg
    });
    const { status, message, setStatus, setMsg } = errorStore(
        useShallow(selector2)
    );

    const manageErrors = (err) => {
        setStatus(err.status);
        setMsg(err.response.statusText);
        popNode();
        pushNode(ErrorModal);
    };

    const manageNodes = (data, file) => {
        const node = {
            id: data.component_id,
            type: 'dataSource',
            position: { x: 0, y: 0 },
            data: {
                name: data.type,
                content: file.name,
                flow_id: flowId,
                prompt: 'Research Assistant',
                file: file
            }
        };
        if (nodes.length === 0) {
            setNodes([node]);
        } else {
            const newArr = [...nodes, node];
            setNodes(newArr);
        }
        setTrigger(!trigger);
    };

    const csvAccept =
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
    const pdfAccept = 'application/pdf';
    // if (data.name === 'pdf') {
    //     console.log('called');
    //     return (
    //         <div className="data-source-input">
    //             <label
    //                 htmlFor="filesUp"
    //                 className="data-source-set"
    //             >
    //                 <div>
    //                     <img
    //                         src={data.img}
    //                         alt={'image will be here'}
    //                     />
    //                     <p>{data.content}</p>
    //                 </div>
    //                 <img
    //                     src={RIGHTArrow}
    //                     alt={'RIght arrow'}
    //                 />
    //             </label>
    //             <input
    //                 id="filesUp"
    //                 type="file"
    //                 accept={data.name === 'csv' ? csvAccept : pdfAccept}
    //                 style={{ display: 'none' }}
    //                 onChange={(e) => handleFileUpload(e)}
    //             />
    //         </div>
    //     );
    // } else {
    return (
        <div
            className="data-source-set"
            onClick={(e) => setDataSourceModal(data.name, pushNode)}
        >
            <div>
                <img
                    src={data.img}
                    alt={'image will be here'}
                />
                <p>{data.content}</p>
            </div>
            <img
                src={RIGHTArrow}
                alt={'RIght arrow'}
            />
        </div>
    );
    // }
};

export default DataSourceSet;
