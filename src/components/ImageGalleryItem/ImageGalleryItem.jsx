import PropTypes from 'prop-types';
import { GalletyItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  modalOpen,
  largeImageURL,
  tag,
}) => {
  return (
    <GalletyItem onClick={() => modalOpen(largeImageURL, tag)}>
      <GalleryItemImage src={webformatURL} alt={tag} />
    </GalletyItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  modalOpen: PropTypes.func,
  largeImageURL: PropTypes.string,
  tag: PropTypes.string,
};
