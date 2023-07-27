import React from 'react'

const SearchItem = () => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <input
            id='search'
            type='text'
            role='searchbox'
            placeholder='Search Items'
        />

    </form>
  )
}

export default SearchItem