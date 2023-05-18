import { Component } from 'react';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import cssModule from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  handleClick = (selectedImage) => {
    this.props.openModal(selectedImage);
  };
  render() {
      return (
          <ul className={cssModule.gallery}>
            {this.props.hits.map(e => (
              <ImageGalleryItem key={e.id} image={e.webformatURL} onClick={() => this.handleClick(e.largeImageURL)} />
            ))}
          </ul>
      );
  }
}
ImageGallery.protoType = {
  hits: PropTypes.node.isRequired,
  openModal: PropTypes.func.isRequired,
}
export default ImageGallery;
