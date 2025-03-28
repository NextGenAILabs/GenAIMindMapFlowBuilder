import { nanoid } from 'nanoid'
import useStore from '../stores/store';
import { useShallow } from 'zustand/shallow';
import generateHexId from '../utils/setUpHex';

const useCreatNode = (nodeData) => {
	// Resposne from create-component
	const nodes = []
	nodeData.forEach(element => {
		const node = {
			id: generateHexId(),
			data: {
				question: element.question,
				component_id: element.component_id,
				flow_id: element.flow_id
			},
			type: 'followUp',
			position: element.position
		}
		nodes.push(node)
	});
	return nodes
}

export default useCreatNode