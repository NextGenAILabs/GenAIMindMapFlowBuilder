import useStore from '../stores/store';
import flowStore from '../stores/flowStore';
import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore';
import LoadingModal from '../modals/LoadingModal';
import DELETESvg from '../assets/delete.svg';
import axios from 'axios';
import { useReactFlow } from '@xyflow/react';

const Flow = ({ data, isDrawer, setIsDrawer, flows, setFlowList }) => {
    const pushNode = modalStore((s) => s.pushNode);
    const popNode = modalStore((s) => s.popNode);
    const setFlowId = flowStore((s) => s.setFlow);
    const flow_id = flowStore((s) => s.flow_id);
    const setFlowName = flowStore((s) => s.setFlowName);
    const { fitView } = useReactFlow();
    const selector = (state) => ({
        trigger: state.trigger,
        setTrigger: state.setTrigger,
        nodes: state.nodes,
        edges: state.edges,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        setViewPort: state.setViewPort
    });

    const {
        trigger,
        setTrigger,
        nodes,
        edges,
        setNodes,
        setEdges,
        setViewPort
    } = useStore(useShallow(selector));


    const setupFlow = (e) => {
        pushNode(LoadingModal);
        setFlowId(data.flow_id);
        console.log('DEDEDE', data);
        setFlowName(data.flow_name);
        if (data.flow_json.length > 0) {
            const flow = JSON.parse(data.flow_json);
            console.log('NODEEEEEEEEEE', flow.nodes);
            if (flow.nodes.length === 0 && flow.edges.length === 0) {
                console.log('not clled');
                setIsDrawer(false);
                setTrigger(!trigger);
                setViewPort(0, 0, 1);
                popNode();
            }
            if (flow) {
                const { x = 0, y = 0, zoom = 1.25 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewPort(x, y, zoom);
                // fitView();
                console.log(
                    'FLow selecteed sadassssssssssssssssssssss',
                    flow_id,
                    data.flow_id,
                    nodes
                );
                setIsDrawer(false);
            } else {
                console.log('Flow error');
            }
        } else {
            setNodes([]);
            setEdges([]);
            // setViewPort({});
            fitView();
            setIsDrawer(false);
            popNode();
        }
        console.log('IDDDARssssssssssssssssssss', isDrawer);
        // setTrigger(!trigger);
    };

    const deleteFlow = (e) => {
        console.log('Delete Flow Called');
        const updatedFlowss = flows.filter(
            (ele) => ele.flow_id !== data.flow_id
        );
        axios
            .delete(`http://localhost:8000/delete-flow/${data.flow_id}`)
            .then((res) => {
                setFlowList(updatedFlowss);
                setIsDrawer(true);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <p onClick={(e) => setupFlow(data.flow_id)}>{data.flow_name}</p>
            <img
                src={DELETESvg}
                alt="delete svg"
                onClick={deleteFlow}
            />
        </div>
    );
};

export default Flow;
