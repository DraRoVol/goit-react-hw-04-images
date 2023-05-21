import React from 'react';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import cssModule from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, openModal }) => {
  const handleClick = selectedImage => {
    openModal(selectedImage);
  };
  return (
    <ul className={cssModule.gallery}>
      {hits.map(e => (
        <ImageGalleryItem
          key={e.id}
          image={e.webformatURL}
          onClick={() => handleClick(e.largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.protoType = {
  hits: PropTypes.node.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGallery;
