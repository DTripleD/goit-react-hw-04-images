import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchbarWrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onInput = event => setInput(event.target.value.trim());

  const onSearchbarSubmit = event => {
    event.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={onSearchbarSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Find</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          onChange={onInput}
          type="text"
          name="input"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
