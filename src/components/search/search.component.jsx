import React from 'react';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import './search.styles.scss';

const Search = ({ q, handleSearchChange, handleSubmit }) => (
    <form className='search-form' onSubmit={handleSubmit}>
        <input type='text' name='location' placeholder='Search for a location...' value={q} onChange={handleSearchChange} required />
        <button className='search-btn'>
            <SearchIcon />
        </button>
    </form>
);

export default Search;