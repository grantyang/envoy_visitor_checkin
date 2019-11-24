import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from './Button.js';
import { postNewVisitor } from '../utils.js';

Modal.setAppElement(document.getElementById('root'));

export default function NewVisitorModal({
  modalIsOpen,
  toggleModal,
  visitors,
  setVisitors,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [error, setError] = useState(false);

  const addVisitor = () => {
    //If name and info is filled out, add new visitor to the backend
    const nameValue = `${firstName} ${lastName}`;
    if (nameValue && infoValue) {
      setError(false);
      postNewVisitor(nameValue, infoValue)
        .then(response => {
          // add user to our state
          const newVisitor = response.data.data;
          setFirstName('');
          setLastName('');
          setInfoValue('');
          setVisitors([...visitors, newVisitor]);
          toggleModal();
        })
        .catch(error => {
          console.log('There was an error adding the visitor');
          console.log(error);
        });
    } else {
      setError(true);
      console.log('name and info are required');
    }
  };

  const closeModal = () => {
    setFirstName('');
    setLastName('');
    setInfoValue('');
    setError(false);
    toggleModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal"
      contentLabel="New Visitor Modal"
    >
      <span>Welcome, please enter your information below.</span>
      <form className="input-container">
        <div className="name-inputs">
          <input
            className="input"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            tabIndex="0"
            required
          />
          <input
            className="input"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            tabIndex="0"
          />
        </div>
        <input
          className="input"
          value={infoValue}
          onChange={e => setInfoValue(e.target.value)}
          placeholder="Notes"
          tabIndex="0"
        />
      </form>
      {error ? <div className="error">Please fill out all fields.</div> : null}
      <div className="modal-actions">
        <Button
          className="secondary-button"
          buttonText="Go Back"
          onClick={closeModal}
        />
        <Button
          className="primary-button"
          buttonText="Save"
          onClick={addVisitor}
        />
      </div>
    </Modal>
  );
}
