import SMALLLsvg from '../assets/small-loading.svg';
import ADDSvg from '../assets/add2.svg';
import Flow from './Flow.jsx';
import flowStore from '../stores/flowStore.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useStore from '../stores/store.js';
import getGenerateHexId from '../utils/setUpHex.js';
import errorStore from '../stores/errorStore.js';
import ErrorModal from '../modals/ErrorModal.jsx';
import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore.js';
import FlowModal from '../modals/FlowModal.jsx';
const Drawer = ({ isDrawer, setIsDrawer, flowList, setFlowList }) => {
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
    const popNode = modalStore((s) => s.popNode);
    const pushNode = modalStore((s) => s.pushNode);
    const [isViewModal, setIsViewFlowModal] = useState(false);

    const createNewFlow = () => {
        const data = {
            flow_name: 'This flow will have edges and nodes again',
            summary: 'Flow is empty',
            flow_json: ''
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

    const newFlowModal = () => {
        setIsViewFlowModal(true)
    }

    const setupNewFlow = (res) => {
        setFlow(res.data.flow_id);
        setIsDrawer(!isDrawer);
        setNodes([]);
        setEdges([]);
        setViewPort({});
        setFlowName('This flow will have edges and nodes again');
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

    const getFlowList = () => {
        axios
            .get(`http://localhost:8000/flows`)
            .then((res) => setFlowList(res.data))
            .catch((err) => manageErrors(err));
    };

    // useEffect(() => {
    // 	getFlowList();
    // }, [isDrawer])

    return (
        <div
            className="drawer-container"
            style={isDrawer ? { display: 'block' } : { display: 'none' }}
        >
            <div className="drawer">
                <div className="drawer-header">
                    <div className="drawer-holder">
                        <img
                            src={SMALLLsvg}
                            alt="Loader"
                        />
                        <h4>Your Thinkplace</h4>
                    </div>
                    <div
                        id="new-flow"
                        onClick={(e) => newFlowModal(e)}
                    >
                        <img
                            src={ADDSvg}
                            alt="Add svg"
                        />
                        <p>NEW</p>
                    </div>
                </div>
                <hr />
                <div className="flows">
                    {flowList.map((ele, index) => (
                        <Flow
                            data={ele}
                            key={index}
                            setIsDrawer={setIsDrawer}
                            isDrawer={isDrawer}
							flows={flowList}
							setFlowList={setFlowList}
                        />
                    ))}
                </div>
            </div>
            {isViewModal ? <FlowModal isDrawer={isDrawer} setIsDrawer={setIsDrawer} isViewModal={isViewModal} setIsViewFlowModal={setIsViewFlowModal}/> : null}
        </div>
    );
};

export default Drawer;
