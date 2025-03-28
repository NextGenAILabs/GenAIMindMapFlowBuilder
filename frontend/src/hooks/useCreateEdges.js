import { nanoid } from "nanoid"

const useCreateEdges = (parentId, childId) => {
	return {
		id: nanoid(),
		source: parentId,
		target: childId,
		animated: true
	}	
}

export default useCreateEdges