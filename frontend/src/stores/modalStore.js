import { create } from 'zustand';
import DataSourceSelect from '../global-components/DataSourceSelect';
const modalStore = create((set) => ({
    node: undefined,
    pushNode: (nd) => {
        set({
            node: nd
        });
    },
    popNode: () =>
        set({
            node: undefined
        }),
    sourceId: undefined,
    setSourceId: (id) => {
        set({
            sourceId: id
        })
    },
    removeSourceId: () => {
        set({
            sourceId: undefined
        })
    }

}));

export default modalStore;
