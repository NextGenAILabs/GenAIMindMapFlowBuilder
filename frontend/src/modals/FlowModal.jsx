import PDFSvg from '../assets/pdf.svg';
import CROSSSvg from '../assets/cross.svg';
import RIGHTArrow from '../assets/right.svg';
import { useState } from 'react';
import InputBar from '../helpful-components/InputBar';
import { nanoid } from 'nanoid';
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore';
import axios from 'axios';
import LoadingModal from './LoadingModal';
import setRequestData from '../config/setRequestData';
import flowStore from '../stores/flowStore';
import DataSourceSet from '../nodes/DataSourceSet';
import DataSourceSelect from '../global-components/DataSourceSelect';
import ErrorModal from './ErrorModal';
import errorStore from '../stores/errorStore';

const FlowModal = ({isDrawer, setIsDrawer, isViewModal, setIsViewFlowModal}) => {
   const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        setNodes: state.setNodes,
        edges: state.edges,
        setEdges: state.setEdges,
        viewport: state.viewport,
        setViewPort: state.setViewPort
    });

    const {
        trigger,
        setTrigger,
        nodes,
        setNodes,
        edges,
        setEdges,
        viewport,
        setViewPort
    } = useStore(useShallow(selector));
    const setFlow = flowStore((s) => s.setFlow);
    const flow = flowStore((s) => s.flow);
    const setFlowName = flowStore((s) => s.setFlowName);
    const flow_name = flowStore((s) => s.flow_name);
    const setFlowType = flowStore((s) => s.setFlowType)
    const popNode = modalStore((s) => s.popNode);
    const pushNode = modalStore((s) => s.pushNode);

    const createNewFlow = () => {
        setIsDrawer(false)
        setIsViewFlowModal(false)
        const data = {
            flow_name: 'New Flow',
            summary: 'Flow is empty',
            flow_json: '',
            flow_type: 'manual'
        };
        axios
            .post(`http://localhost:8000/create-flow`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => setupNewFlow(res))
            .catch((err) => manageErrors(err));
    };

    const createAutomaticFlow = () => {
        setIsDrawer(false)
        setIsViewFlowModal(false)
        const data = {
            flow_name: 'New Flow',
            summary: 'Flow is empty',
            flow_json: '',
            flow_type: 'automatic'
        };
        axios
            .post(`http://localhost:8000/create-flow`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => setupNewFlow(res))
            .catch((err) => manageErrors(err));
    };


    const setupNewFlow = (res) => {
        console.log("SERVER RESPONSE", res.data)
        setFlow(res.data.flow_id);
        setFlowType(res.data.flow_type)
        setIsDrawer(!isDrawer);
        setNodes([]);
        setEdges([]);
        setViewPort({});
        setFlowName('New Flow');
        setTrigger(!trigger);
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
    return (
        <div className='container'>
            <div className="modal-container">
                <div className="title">
                    <div>
                        <p>Select Flow Type</p>
                    </div>
                    <img
                        src={CROSSSvg}
                        alt="Cross Svg"
                        onClick={(e) => setIsViewFlowModal(false)}
                    />
                </div>
                <div className="buttons">
                    <button
                        id="cancel"
                        onClick={(e) => createAutomaticFlow(e)}
                    >
                        Automatic
                    </button>
                    {/* <button id="add" onClick={(e) => addDataSource(e)}>Add</button> */}

                    <button
                        id="add"
                        style={{ opacity: '100%' }}
                        onClick={(e) => createNewFlow(e)}
                    >
                        Manual
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlowModal;