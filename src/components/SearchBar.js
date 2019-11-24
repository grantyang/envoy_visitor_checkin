import React from 'react';

export default function SearchBar({ setSearchQuery, searchQuery }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={searchQuery}
      placeholder="Search by Name"
      onChange={e => setSearchQuery(e.target.value)}
    />
  );
}
