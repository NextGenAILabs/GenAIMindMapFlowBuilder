import SQLSvg from '../assets/sql.svg';
import CROSSSvg from '../assets/cross.svg';
import InputBar from '../helpful-components/InputBar';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore';
import { useReactFlow } from '@xyflow/react';
import LoadingModal from './LoadingModal';
import setRequestData from '../config/setRequestData';
import axios from 'axios';
import flowStore from '../stores/flowStore';
import DataSourceSelect from '../global-components/DataSourceSelect';
import errorStore from '../stores/errorStore';
import ErrorModal from './ErrorModal';
const SQLModal = () => {
    const selector = (state) => ({
        nodes: state.nodes,
        setNodes: state.setNodes,
        trigger: state.trigger,
        setTrigger: state.setTrigger
    });
    const { nodes, setNodes, trigger, setTrigger } = useStore(
        useShallow(selector)
    );
    const [tableName, setTableName] = useState('');
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    const flowId = flowStore((s) => s.flow_id);
    const addDataSource = (e) => {
        const data = {
            content: tableName
        };
        pushNode(LoadingModal);
        const [url, body, headerConfig] = setRequestData('sql', flowId, data);
        console.log('Testtttttt', url, body, headerConfig);
        axios
            .post(`http://localhost:8000/${url}`, body, {
                headers: {
                    'Content-Type': headerConfig
                }
            })
            .then((res) => manageNodes(res.data))
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
        console.log(err);
        console.log('Errroro', err.status);
        console.log('Errroross', err.response.statusText);
        setStatus(err.status);
        setMsg(err.response.statusText);
        popNode();
        pushNode(ErrorModal);
    };

    const manageNodes = (data) => {
        console.log('Problem is here', nodes);
        const node = {
            id: data.component_id,
            position: { x: 0, y: 0 },
            type: 'dataSource',
            data: {
                name: data.type,
                content: tableName,
                flow_id: flowId,
                prompt: 'Research Assistant'
            }
        };
        if (nodes.length === 0) {
            setNodes([node]);
        } else {
            const newArr = [...nodes, node];
            setNodes(newArr);
        }
        setTrigger(!trigger);
        console.log('Managing nodes finished');
    };

    return (
        <div className="modal-container">
            <div className="title">
                <div>
                    <img
                        src={SQLSvg}
                        alt="SQL SVG"
                    />
                    <p>Connect SQL</p>
                </div>
                <img
                    src={CROSSSvg}
                    alt="Cross Svg"
                    onClick={(e) => popNode()}
                />
            </div>
            <InputBar
                data={{
                    type: 'text',
                    label: 'Enter Table Name*',
                    placeholder: 'Positions',
                    setTableName: setTableName
                }}
            />
            <div className="buttons">
                <button
                    id="cancel"
                    onClick={(e) => pushNode(DataSourceSelect)}
                >
                    Back
                </button>
                {tableName ? (
                    <button
                        id="add"
                        style={{ opacity: '100%' }}
                        onClick={(e) => addDataSource(e)}
                    >
                        Add
                    </button>
                ) : (
                    <button
                        id="add"
                        style={{ opacity: '40%' }}
                        disabled
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default SQLModal;
