import React from 'react';
import VisitorListItem from './VisitorListItem.js';
export default function VisitorList({ visitors, filter, searchQuery }) {
  let filteredVisitors;

  //Filter by status
  if (filter === 'all') filteredVisitors = visitors;
  else if (filter === 'signed_out')
    filteredVisitors = visitors.filter(v => v.attributes.sign_out);
  else filteredVisitors = visitors.filter(v => !v.attributes.sign_out);

  //Then filter by search query
  filteredVisitors = filteredVisitors.filter(v => {
    return v.attributes.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="visitor-list">
      <div className="visitor-list-header">
        <span className="column-data">Name</span>
        <span className="column-data">Notes</span>
        <span className="column-data">Signed Out</span>
      </div>
      {filteredVisitors.map(visitor => {
        return (
          <VisitorListItem
            key={visitor.id}
            userId={visitor.id}
            visitorAttributes={visitor.attributes}
          />
        );
      })}
    </div>
  );
}
