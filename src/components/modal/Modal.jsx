import React, { useEffect } from 'react';
import cssModule from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ selectedImage, onCloseModal }) => {
  const handleImageClick = e => {
    e.stopPropagation();
  };
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseModal();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className={cssModule.overlay} onClick={onCloseModal}>
      <div className={cssModule.modal}>
        <img src={selectedImage} alt="img" onClick={handleImageClick} />
      </div>
    </div>
  );
};
Modal.protoType = {
  selectedImage: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
