import dagre from "@dagrejs/dagre"

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges) => {
	console.log("Problem here cab be", nodes)
	const graphDirection = 'LR' // horizontal
	dagreGraph.setGraph({ rankdir: graphDirection })
	nodes.forEach((node) => {
		console.log(node)
		dagreGraph.setNode(node.id, { width: node.measured.width, height: node.measured.height });
	});

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	const newNodes = nodes.map((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		const newNode = {
			...node,
			targetPosition: 'left',
			sourcePosition: 'right',
			position: {
				x: nodeWithPosition.x - node.measured.width / 2,
				y: nodeWithPosition.y - node.measured.height / 2,
			},
		};
		return newNode;
	});
	return { nodes: newNodes, edges };

}

export default getLayoutedElements