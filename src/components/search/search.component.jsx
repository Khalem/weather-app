import React from 'react';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import './search.styles.scss';

const Search = ({ q, handleSearchChange, handleSubmit, placeholder }) => (
    <form className='search-form' onSubmit={handleSubmit}>
        <input type='text' name='location' placeholder={placeholder} value={q} onChange={handleSearchChange} required />
        <button className='search-btn'>
            <SearchIcon />
        </button>
    </form>
);

export default Search;