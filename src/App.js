import React, { useState, useEffect } from 'react';
import { getVisitors } from './utils.js';
import Header from './components/Header.js';
import Filters from './components/Filters';
import VisitorList from './components/VisitorList';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [visitors, setVisitors] = useState([]);

  //Populate visitors array from API on initial load
  useEffect(() => {
    getVisitors()
      .then(response => {
        let visitorsArray = visitors;
        if (response.data) visitorsArray = response.data.data;
        setVisitors(visitorsArray);
      })
      .catch(error => {
        console.log('There was an error getting the visitors');
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setVisitors={setVisitors}
        visitors={visitors}
        setFilter={setFilter}
      />
      <Filters filter={filter} setFilter={setFilter} />
      <VisitorList
        visitors={visitors}
        filter={filter}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
