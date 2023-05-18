import { Component } from 'react';
import { getSearchNews } from '../api/getSearchNews';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    searchText: '',
    hits: [],
    totalHits: 0,
    status: 'idle',
    currentPage: 1,
    selectedImage: null,
    isModalOpen: false,
  };
  handleSearch = searchText => {
    this.setState({ searchText });
  };
  handleOpenModal = (selectedImage) => {
    this.setState({ selectedImage, isModalOpen: true });
  };
  handleCloseModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };
  loadMore = () => {
    const { searchText, currentPage } = this.state;
    const nextPage = currentPage + 1;
    this.setState({ status: 'pending' });
    getSearchNews(searchText.trim(), nextPage).then(({ hits, totalHits }) =>
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
        totalHits,
        currentPage: nextPage,
        status: hits.length >= totalHits ? 'done' : 'fulfilled',
      }))
    );
  };
  componentDidUpdate(prevProps, prevState) {
    const text = this.state.searchText.trim();
    if (prevState.searchText !== text && text) {
      this.setState({ status: 'pending', hits: [], currentPage: 1 });
      getSearchNews(text).then(({ hits }) =>
        this.setState({ hits, status: 'fulfilled' })
      );
    }
  }
  render() {
    const { hits, status, selectedImage, isModalOpen } = this.state;
    const hasResults = hits.length > 0;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearch} />
        {hasResults && (
          <div className="container-list">
            <ImageGallery hits={hits} openModal={this.handleOpenModal} />
            {status === 'pending' && <Loader />}
            {status !== 'done' && <Button onClick={this.loadMore} />}
          </div>
        )}
        {isModalOpen && (
          <Modal 
            selectedImage={selectedImage} 
            onCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
