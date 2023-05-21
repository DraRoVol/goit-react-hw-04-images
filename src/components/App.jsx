import React, { useState, useEffect, useCallback } from 'react';
import { getSearchNews } from '../api/getSearchNews';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = useCallback(searchText => {
    setSearchText(searchText);
  }, []);
  const handleOpenModal = useCallback(selectedImage => {
    setSelectedImage(selectedImage);
    setIsModalOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setIsModalOpen(false);
  }, []);
  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setStatus('pending');
    getSearchNews(searchText.trim(), nextPage).then(({ hits, totalHits }) => {
      setHits(prevHits => [...prevHits, ...hits]);
      setCurrentPage(nextPage);
      setStatus(hits.length >= totalHits ? 'done' : 'fulfilled');
    });
  }, [currentPage, searchText]);
  useEffect(() => {
    const text = searchText.trim();
    if (text) {
      setStatus('pending');
      setHits([]);
      setCurrentPage(1);
      getSearchNews(text).then(({ hits }) => {
        setHits(hits);
        setStatus('fulfilled');
      });
    }
  }, [searchText]);
  const hasResults = hits.length > 0;
  return (
    <div className="container">
      <Searchbar onSubmit={handleSearch} />
      {hasResults && (
        <div className="container-list">
          <ImageGallery hits={hits} openModal={handleOpenModal} />
          {status === 'pending' && <Loader />}
          {status !== 'done' && <Button onClick={loadMore} />}
        </div>
      )}
      {isModalOpen && (
        <Modal selectedImage={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
export default App;
