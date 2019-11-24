import React from 'react';
import SignoutButton from './SignoutButton.js';

export default function VisitorListItem({ userId, visitorAttributes }) {
  const { name, notes, sign_out } = visitorAttributes;

  return (
    <div className="visitor-list-item">
      <span className="column-data">{name}</span>
      <span className="column-data">{notes}</span>
      <span className="column-data">
        <SignoutButton userId={userId} signOut={sign_out} />
      </span>
    </div>
  );
}
