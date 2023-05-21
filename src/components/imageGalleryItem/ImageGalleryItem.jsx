import cssModule from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={cssModule.item}>
      <img
        className={cssModule.image}
        src={image}
        alt="img"
        onClick={onClick}
      />
    </li>
  );
};
ImageGalleryItem.protoType = {
  image: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default ImageGalleryItem;
