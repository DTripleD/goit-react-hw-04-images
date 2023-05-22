import { useState, useEffect } from 'react';
import { AppWrapper, Warning } from './App.styled';
import { Searchbar, ImageGallery, Modal, Button, Loader } from 'components';
import * as Images from '../../services/ApiService';

export const App = () => {
  const [photoList, setPhotoList] = useState([]);
  const [input, setInput] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [altAtr, setAltAtr] = useState('');

  useEffect(() => {
    if (!input) {
      return;
    }
    setIsLoading(true);
    Images.getImages(input, page)
      .then(({ hits, total }) => {
        if (!hits.length) {
          throw new Error('Nothing found for your request');
        }

        setPhotoList(prevPhotoList => [...prevPhotoList, ...hits]);
        setIsSeeMore(() => page < Math.ceil(total / 12));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [input, page]);

  const onFormSubmit = querry => {
    if (querry === input) {
      alert('Enter a new word');
      return;
    }
    setInput(querry);
    setPage(1);
    setPhotoList([]);
    setIsSeeMore(false);
    setError(null);
  };

  const onLoadMore = () => setPage(prevPage => prevPage + 1);

  const toggleModal = (largeImageURL, alt) => {
    setModalImg(largeImageURL);
    setIsOpen(prevState => !prevState);
    setAltAtr(alt);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={onFormSubmit} />
      {error ? (
        <Warning textAlign="center">Sorry. {error} ... 😭</Warning>
      ) : (
        <ImageGallery photoList={photoList} modalOpen={toggleModal} />
      )}

      {isOpen && (
        <Modal
          largeImageURL={modalImg}
          modalClose={toggleModal}
          altAtr={altAtr}
        />
      )}
      {isSeeMore && <Button onLoadMore={onLoadMore}></Button>}
      {isLoading && <Loader />}
    </AppWrapper>
  );
};
