import axios from 'axios';

//Create axios instance with our api key
const instance = axios.create({
  baseURL: 'https://mini-visitors-service.herokuapp.com/api',
  headers: {
    'content-type': 'application/json',
    'X-Api-Key': process.env.REACT_APP_API_KEY,
  },
});

//Gets all of our visitors
export function getVisitors() {
  return instance.get('/entries');
}

//Creates a new visitor
export function postNewVisitor(nameValue, infoValue) {
  return instance.post('/entries', {
    data: {
      type: 'entries',
      attributes: {
        name: nameValue,
        notes: infoValue,
      },
    },
  });
}

//Signs out a visitor
export function signOutVisitor(userId) {
  return instance.post('/entries/sign_out', {
    data: {
      type: 'entries',
      id: userId,
    },
  });
}
