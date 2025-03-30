import DRAWERSvg from '../assets/drawer.svg';
import LIGHT from '../assets/lightMode.svg';
import DARK from '../assets/darkMode.svg';
import LoadingModal from '../modals/LoadingModal';
import flowStore from '../stores/flowStore';
import modalStore from '../stores/modalStore';
import axios from 'axios';
import DOWNLOADSvg from '../assets/download_img.svg';
import SHARESvg from '../assets/share.svg';
import {
    getNodesBounds,
    getViewportForBounds,
    useReactFlow
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import FlowSummary from '../modals/FlowSummary';
import errorStore from '../stores/errorStore';
import ErrorModal from '../modals/ErrorModal';
import { useShallow } from 'zustand/shallow';
import useStore from '../stores/store';
const Header = ({
    isDrawer,
    setIsDrawer,
    flowList,
    setFlowList,
    lightMode,
    setLightMode
}) => {
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    const flow_id = flowStore((s) => s.flow_id);
    const flow_type = flowStore((s) => s.flow_type);
    const rfInstance = flowStore((s) => s.rfInstance);
    const flow_name = flowStore((s) => s.flow_name);
    const setFlowName = flowStore((s) => s.setFlowName);
    const setFlowSummary = flowStore((s) => s.setFlowSummary);
    const selector = (s) => ({
        trigger: s.trigger,
        setTrigger: s.setTrigger
    });
    const setTheme = flowStore((s) => s.setTheme);
    const { trigger, setTrigger } = useStore(useShallow(selector));
    const { getNodes } = useReactFlow();
    const saveFlow = (e) => {
        pushNode(LoadingModal);
        saveFlowCall(e);
    };
    const saveFlowCall = (e) => {
        pushNode(LoadingModal);
        const flow_json = JSON.stringify(rfInstance.toObject());
        const data = {
            flow_id: flow_id,
            flow_name: flow_name,
            flow_json: flow_json,
            flow_type: flow_type,
            summary: 'Please work'
        };
        console.log('JSON DATA', data);
        axios
            .put(`http://localhost:8000/flow-update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => console.log(res))
            .catch((err) => manageErrors(err));

        popNode();
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

    const initiateDownload = (imgUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'flow_name.png');
        a.setAttribute('href', imgUrl);
        a.click();
    };

    const downloadImage = (e) => {
        const nodeBounds = getNodesBounds(getNodes());
        const viewPort = getViewportForBounds(nodeBounds, 1920, 1080, 0, 2);
        toPng(document.querySelector('.react-flow__viewport'), {
            // width: 1920,
            // height: 1080,
            backgroundColor: '#1e1e1e',
            style: {
                // width: 1920,
                // height: 1080,
                transform: `translate(${viewPort.x}px, ${viewPort.y}px, scale(${viewPort.zoom}))`
            }
        }).then(initiateDownload);
    };

    const setupFlowName = (e) => {
        console.log(e.target.value);
        setFlowName(e.target.value);
    };

    const flowSummary = (e) => {
        pushNode(LoadingModal);
        console.log('THIS IS FLOW ID', flow_id);
        const data = {
            flow_id: flow_id
        };
        axios
            .post(`http://localhost:8000/flow-summarizer`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                setFlowSummary(res.data.response);
                popNode();
                pushNode(FlowSummary);
            })
            .catch((err) => manageErrors(err));
    };

    const getFlowList = () => {
        axios
            .get(`http://localhost:8000/flows`)
            .then((res) => {
                pushNode(LoadingModal);
                setFlowList(res.data);
                setIsDrawer(true);
                popNode(LoadingModal);
            })

            .catch((err) => manageErrors(err));
    };

    const manageTheme = (e) => {
        setTheme(!lightMode);
        setLightMode(!lightMode);
        setTrigger(!trigger);
    };

    // useEffect(() => {
    // 	getFlowList();
    // }, [isDrawer])

    return (
        <div
            className="header"
            style={isDrawer ? { display: 'none' } : { display: 'flex' }}
        >
            <img
                src={DRAWERSvg}
                alt="Drawer Svg"
                onClick={(e) => getFlowList(true)}
            />
            <input
                type="text"
                defaultValue={flow_name}
                onChange={(e) => setupFlowName(e)}
            />
            <div className="button">
                <img
                    src={lightMode ? LIGHT : DARK}
                    alt="Save button"
                    onClick={(e) => manageTheme(!lightMode)}
                />
                <img
                    src={DOWNLOADSvg}
                    alt="download_svg"
                    onClick={(e) => downloadImage(e)}
                />
                <img
                    src={SHARESvg}
                    alt="share_svg"
                />
                <button
                    id="save-button"
                    style={flow_type === 'automatic' ?  { display: 'none' } : { display: 'flex' }}
                    onClick={(e) => flowSummary(e)}
                >
                    <span>Summarize</span>
                </button>
                <button
                    id="save-button"
                    onClick={(e) => saveFlow()}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Header;
