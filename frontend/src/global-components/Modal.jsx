import { useShallow } from 'zustand/shallow';
import modalStore from '../stores/modalStore';

const Modal = () => {
    const Node = modalStore((s) => s.node)
    return (
        <div className='modal' style={Node ? { display: 'flex' } : { display: 'none' }}>
            {Node && <Node />}
        </div>
    )

};

export default Modal;
