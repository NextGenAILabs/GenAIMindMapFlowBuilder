import {
    Panel,
    ReactFlow,
    useNodesInitialized,
    useOnSelectionChange,
    useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { nodeTypes } from './nodes/nodeTypes.js';
import { useShallow } from 'zustand/shallow';
import useStore from './stores/store.js';
import Modal from './global-components/Modal.jsx';
import Prompts from './global-components/Prompts.jsx';
import AddDataSource from './global-components/AddDataSource.jsx';
import getLayoutedElements from './utils/setLayout.js';
import modalStore from './stores/modalStore';
import AskMultiple from './global-components/AskMultiple.jsx';
import Header from './global-components/Header.jsx';
import Drawer from './global-components/Drawer.jsx';
import flowStore from './stores/flowStore.js';
const App = () => {
    const nodeType = useMemo(() => nodeTypes, []);
    const selector = (state) => ({
        trigger: state.trigger,
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        setNodes: state.setNodes,
        setEdges: state.setEdges
    });
    const {
        trigger,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        setNodes,
        setEdges
    } = useStore(useShallow(selector));
    const areNodesIntialised = useNodesInitialized();
    const [askMultipleClass, setAskMultipleClass] = useState();
    const [isDrawer, setIsDrawer] = useState(false);
    const setRfInstance = flowStore((s) => s.setRfInstance);
    const [selectedNodes, setSelectedNodes] = useState();
    const reactFlow = useReactFlow();
    const { fitView } = useReactFlow();
    const popNode = modalStore((s) => s.popNode);
    const [flowList, setFlowList] = useState([]);
    const [lightMode, setLightMode] = useState(false);
    const flow_type = flowStore((s) => s.flow_type);

    const onChange = useCallback(
        ({ nodes }) => {
            const responseNodes = nodes.filter(
                (ele) => ele.type === 'response'
            );
            if (responseNodes.length === 0) {
                setSelectedNodes(undefined);
                setAskMultipleClass('deanimate');
                return;
            }
            if (responseNodes.length !== nodes.length) {
                setSelectedNodes(undefined);
                setAskMultipleClass('deanimate');
                return;
            }
            if (responseNodes.length > 1 && responseNodes.length <= 4) {
                setSelectedNodes(responseNodes);
                setAskMultipleClass('animate');
            } else if (
                responseNodes.length > 4 &&
                askMultipleClass === 'animate'
            ) {
                setAskMultipleClass('deanimate');
            }
        },
        [askMultipleClass]
    );

    useOnSelectionChange({
        onChange
    });

    const showDataSource = () => {
        if (flow_type === 'automatic' && nodes.length > 0) {
            console.log("false")
            return false
        } else {
        console.log("true", flow_type, nodes)
        return true
        }
    }

    // const setFlowId = flowStore((s) => s.setFlow);
    // const flow_id = flowStore((s) => s.flow_id);
    // const setFlowName = flowStore((s) => s.setFlowName);

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/flows`)
    //         .then((res) => {
    //             if (res.data.length > 0 && Array.isArray(res.data)) {
    //                 setFlowId(res.data.flow_id)
    //                 setFlowName(res.data.flow_name);
    //             } else if (!Array.isArray(res.data)) {
    //                 pushNode(ErrorModal);
    //             } else {
    //                 pushNode(DataSourceSelect);
    //             }
    //         })
    //         .catch((err) => pushNode(LoadingModal));
    // }, []);

    useEffect(() => {
        // if (nodes.length > 0) {
        //     setTimeout(() => {
        //         const data = reactFlow.getNodes()
        //         const { nodes: newNodes, edges: newEdges } = getLayoutedElements(data, edges)
        //         setNodes(newNodes)
        //         setEdges(newEdges)
        //     }, 90)
        //     setTimeout(() => {
        //         popNode();
        //         reactFlow.fitView()
        //     }, 95)

        // }
        if (areNodesIntialised) {
            setTimeout(() => {
                const data = reactFlow.getNodes();
                console.log('Problem can be here', data);
                const { nodes: newNodes, edges: newEdges } =
                    getLayoutedElements(data, edges);
                setNodes(newNodes);
                setEdges(newEdges);
                fitView(nodes);
                popNode();
            }, 1000);
        }
    }, [areNodesIntialised, trigger]);

    useEffect(() => {
        fitView();
    }, [trigger]);

    return (
        <div className={lightMode ? 'app light' : 'app dark'}>
            <Modal ChildProp={Prompts} />
            <Header
                isDrawer={isDrawer}
                setIsDrawer={setIsDrawer}
                flowList={flowList}
                setFlowList={setFlowList}
                lightMode={lightMode}
                setLightMode={setLightMode}
            />
            <Drawer
                isDrawer={isDrawer}
                setIsDrawer={setIsDrawer}
                flowList={flowList}
                setFlowList={setFlowList}
            />
            <ReactFlow
                nodeTypes={nodeType}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                colorMode={lightMode ? 'light' : 'dark'}
                fitView={true}
                proOptions={{ hideAttribution: true }}
                onInit={setRfInstance}
                minZoom={-1}
                maxZoom={100}
            >
                {showDataSource() ? 
                <Panel
                    position="bottom-left"
                    style={isDrawer ? { display: 'none' } : { display: 'flex' }}
                >
                    <AddDataSource />
                </Panel>
                : null }
                <Panel position="bottom">
                    <AskMultiple
                        data={askMultipleClass}
                        selectedNodes={selectedNodes}
                    />
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default App;
