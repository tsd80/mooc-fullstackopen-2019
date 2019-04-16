import axios from 'axios'

const conUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(conUrl).then(resp => resp.data)
};

const createNew = newObj => {
  return axios.post(conUrl,newObj).then(resp=>resp.data)
};

const deletePerson = id => {
  return axios.delete(`${conUrl}/${id}`).then(resp=>resp.data)
};

export default {getAll,createNew, deletePerson}