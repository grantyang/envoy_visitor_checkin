import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import * as utils from './utils.js';
import { act } from 'react-dom/test-utils';

import App from './App';
import Filters from './components/Filters';
import VisitorList from './components/VisitorList';
import VisitorListItem from './components/VisitorListItem';
import Header from './components/Header';

let container;
const testVisitorsArray = [
  {
    type: 'entries',
    id: 82,
    attributes: {
      name: 'Grant Yang',
      notes: 'some more notes',
      sign_out: null,
    },
  },
  {
    type: 'entries',
    id: 83,
    attributes: {
      name: 'Elon Musk',
      notes: 'Cybertruck design meeting',
      sign_out: '2019-11-24T19:47:55.554Z',
    },
  },
  {
    type: 'entries',
    id: 84,
    attributes: {
      name: 'Barack Obama',
      notes: 'Board meeting',
      sign_out: null,
    },
  },
];

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('App component', () => {
  const axiosSpy = jest.spyOn(utils, 'getVisitors').mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve(testVisitorsArray),
    };
    return Promise.resolve(fetchResponse);
  });
  test('App renders', async () => {
    await act(async () => {
      ReactDOM.render(<App />, container);
    });
  });
  test('getVisitors endpoint called', () => {
    expect(axiosSpy).toHaveBeenCalled();
  });
  test('loads proper components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Filters)).toHaveLength(1);
    expect(wrapper.find(VisitorList)).toHaveLength(1);
  });
});

describe('VisitorList component', () => {
  it('shows all visitors', () => {
    const wrapper = shallow(
      <VisitorList visitors={testVisitorsArray} searchQuery="" filter="all" />
    );
    expect(wrapper.find(VisitorListItem)).toHaveLength(3);
  });
  it('filters by status', () => {
    const wrapper = shallow(
      <VisitorList
        visitors={testVisitorsArray}
        searchQuery=""
        filter="signed_out"
      />
    );
    expect(wrapper.find(VisitorListItem)).toHaveLength(1);
  });
  it('filters by name', () => {
    const wrapper = shallow(
      <VisitorList visitors={testVisitorsArray} searchQuery="ra" filter="all" />
    );
    expect(wrapper.find(VisitorListItem)).toHaveLength(2);
  });
});
