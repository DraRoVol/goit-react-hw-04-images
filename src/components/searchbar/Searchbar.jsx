import React, { useState } from 'react';
import cssModule from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };
  return (
    <header className={cssModule.searchbar}>
      <form className={cssModule.form} onSubmit={handleSubmit}>
        <button type="submit" className={cssModule.button}>
          <span className="button-label">🔍</span>
        </button>
        <input
          className={cssModule.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};
Searchbar.protoType = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
