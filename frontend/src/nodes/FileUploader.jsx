import { Handle, Position, useNodeId } from '@xyflow/react';
import { MdFileUpload } from 'react-icons/md';
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import Prompts from '../global-components/Prompts';
import { useState } from 'react';
import axios from "axios";
import useCreatNode from '../hooks/useCreateNodes';
import useCreateEdges from '../hooks/useCreateEdges';
import { nanoid } from 'nanoid';
import flowStore from '../stores/flowStore';
import generateHexId from '../utils/setUpHex';

// eslint-disable-next-line react/prop-types
const FileUploader = ({ id, data, position }) => {
    const selector = (state) => ({
        uploadfile: state.uploadfile,
        nodes: state.nodes,
        setnodes: state.setnodes,
        edges: state.edges,
        setedges: state.setedges
    });

    const flowId = flowStore((s) => s.flowId)

    const { uploadfile, nodes, setnodes, edges, setedges } = usestore(useshallow(selector));

    const [isOpen, setIsOpen] = useState(false);

    const fileChange = (e) => {
        uploadFile(id, e.target.files[0]);
    };

    const uploadFileToDB = (e) => {
        console.log("uploadFileToDB" + "started")
        // Uploads and extracts file to MongoDb
        const node_id = []
        if (Array.isArray(nodes)) {
            nodes.forEach(node => {
                node_id.push(node.id)
            });
        } else if (node.id === id) {
            node_id.push(node)
        } else {
            return "Node not found"

        }
        console.log(id)
        // if (!(id in node_id)) {
        // }

        const node = nodes.filter((node) => node.id === id)
        const file = node[0].data.file
        const formData = new FormData();
        formData.append("flow_id", "6773dca11fedc7239c286b2b")
        formData.append("file", file)
        console.log(file, "err")
        axios.post("http://localhost:8000/component-create-pdf", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => manageNodes(res.data))
            .catch((err) => console.log(err))
    }

    const manageNodes = (data) => {
        console.log("Started")
        const currentNode = nodes.filter((node) => node.id === id)
        /* Only for development*/
        console.log(currentNode[0])
        console.log("manageNodes called")
        const resData = []
        for (let i = 0; i < 3; i++) {
            const obj = {
                position: { x: currentNode[0].position.x + 300, y: i * 100 },
                question: "Hi how are you" + i,
                flow_id: flowId,
                ...data
            }
            resData.push(obj)

        }
        /* Till Here */
        console.log("Starting Create Nodes")
        const updatedNodes = useCreatNode(resData);
        updatedNodes.push({
            id: generateHexId(),
            data: { component_id: data.component_id, flow_id: flowId },
            type: "question",
            position: { x: currentNode[0].position.x + 300, y: (resData.length + 1) * 100 }
        })
        console.log("Nodes updated" + nodes.concat(updatedNodes))
        setNodes(nodes.concat(updatedNodes))
        console.log("Creating Edges")
        const newEdges = []
        updatedNodes.forEach(element => {
            const edge = useCreateEdges(id, element.id);
            newEdges.push(edge)
        });

        const updEdges = edges.concat(newEdges)
        setEdges(updEdges)
        console.log("Setting edges completed")
    }

    const fileUpload = () => {
        return (
            <div className="node-file-uploader">
                <p className="node-description">File Upload</p>
                <div id="file-uploader">
                    <div id="file-upload-section">
                        <p>Choose a file to upload</p>
                        <label htmlFor="file-picker">
                            <MdFileUpload style={{ paddingTop: '0.3rem' }} />
                        </label>
                    </div>
                    <input
                        type="file"
                        name="file-picker"
                        id="file-picker"
                        onChange={fileChange}
                    />
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                />
            </div>
        );
    };

    const uploadedFile = () => {
        return (
            <div className="node-uploaded-file">
                <Prompts
                    nodes={nodes}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    id={id}
                    positions={position}
                />
                <div
                    id="file-name"
                    style={isOpen ? { display: 'none' } : { display: 'block' }}
                >
                    <p className="node-description">File Name</p>
                    <input
                        disabled
                        type="text"
                    />
                </div>
                <div
                    id="file-name"
                    style={isOpen ? { display: 'none' } : { display: 'block' }}
                >
                    <p className="node-description">Location</p>
                    <input
                        disabled
                        type="text"
                    />
                </div>
                <div className='upload-file-event'>
                    <button onClick={uploadFileToDB}>Upload File</button>

                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                />
            </div>
        );
    };

    if (data.file) {
        return uploadedFile();
    } else {
        return fileUpload();
    }
};

export default FileUploader;
