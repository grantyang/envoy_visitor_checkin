import React from 'react';

export default function Filters({ filter, setFilter }) {
  return (
    <div className="filters">
      User Filter:
      <select
        className="filters-dropdown"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="all">Show All</option>
        <option value="signed_in">Show Signed In</option>
        <option value="signed_out">Show Signed Out</option>
      </select>
    </div>
  );
}
