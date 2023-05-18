import { Component } from 'react';
import cssModule from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };
  render() {
    return (
      <header className={cssModule.searchbar}>
        <form className={cssModule.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={cssModule.button}>
            <span className="button-label">🔍</span>
          </button>
          <input
            className={cssModule.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
Searchbar.protoType = {
  onSubmit: PropTypes.func.isRequired,
}
export default Searchbar;
