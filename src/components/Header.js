import React, { useState } from 'react';

import SearchBar from './SearchBar.js';
import NewVisitorModal from './NewVisitorModal.js';
import Button from './Button.js';
import logo from '../logo.png';

export default function Header({
  searchQuery,
  setSearchQuery,
  visitors,
  setVisitors,
  setFilter,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const handleOpenModal = () => {
    setSearchQuery('');
    setFilter('all');
    toggleModal();
  };

  return (
    <div className="header">
      <img src={logo} id="envoy-logo" alt="logo" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewVisitorModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        visitors={visitors}
        setVisitors={setVisitors}
      />
      <Button
        className="primary-button"
        buttonText="New Visitor"
        onClick={handleOpenModal}
      />
    </div>
  );
}
