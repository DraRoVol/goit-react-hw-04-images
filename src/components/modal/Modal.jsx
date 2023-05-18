import React, { Component } from 'react';
import cssModule from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  handleImageClick = e => {
    e.stopPropagation();
  };
  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const { selectedImage, onCloseModal } = this.props;

    return (
      <div className={cssModule.overlay} onClick={onCloseModal}>
        <div className={cssModule.modal}>
          <img src={selectedImage} alt="img" onClick={this.handleImageClick} />
        </div>
      </div>
    );
  }
}
Modal.protoType = {
  selectedImage: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}
export default Modal;
