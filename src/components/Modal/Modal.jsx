import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

export const Modal = ({ modalClose, largeImageURL, altAtr }) => {
  useEffect(() => {
    const clickEsc = e => {
      if (e.key === 'Escape') {
        modalClose();
      }
    };

    document.addEventListener('keydown', clickEsc);

    return () => document.removeEventListener('keydown', clickEsc);
  }, [modalClose]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      modalClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleClick}>
      <ModalWrapper className="modal">
        <img src={largeImageURL} alt={altAtr} />
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  modalClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
