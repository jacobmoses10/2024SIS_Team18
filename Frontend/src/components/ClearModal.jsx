import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ClearModal = ({clearModal, setClearModal, clearCanvas}) => {
  const handleClear = () => {
    clearCanvas();
    setClearModal(false);
  };

  return(
    <div>
      <Modal
        isOpen={clearModal}
        onRequestClose={() => setClearModal(false)}
      >
        <h2>Warning</h2>
        <div>Are you sure you want to clear the whiteboard?</div>
        <button onClick={() => setClearModal(false)}>Cancel</button>
        <button onClick={() => handleClear()}>Clear</button>       
      </Modal>
    </div>
  );
}
export default ClearModal;