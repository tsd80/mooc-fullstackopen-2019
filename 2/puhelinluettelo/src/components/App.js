import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PrintOut = (props) => {
  let i=0;
  const names = () => props.list.map((name) => {
    i++;
    if (name.name.toLowerCase().indexOf(props.search)!==-1){
    return <Name name={name} key={i}/>}
    else {return ''}
  });
  return (<div>{names()}</div>)
};

const Name = (props) => {
  return (
      <div>{props.name.name} {props.name.number}</div>
  )
};

const Filter = (props) => {
  return (
      <div>rajaa näyettäviä: <input value={props.search} onChange={props.func}/><br /><br /></div>
  )
};

const NewForm = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>nimi: <input value={props.newName} onChange={props.onNameChange} name="test"/></div>
        <div>puhelinnumero: <input value={props.newPhone} onChange={props.onPhoneChange}/></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
  )
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const onNameChange = (e) => setNewName(e.target.value);
  const onPhoneChange = (e) => setNewPhone(e.target.value);
  const onSearchChange = (e) => setSearch(e.target.value);
  const addPerson = (e) => {
    console.log(e.target.name);
    e.preventDefault();

    if (persons.some((person) =>person.name===newName)) {window.alert(`${newName} on jo luettelossa`)}
    else {
      const personObj = {name: newName, number: newPhone};

      axios
      .post('http://localhost:3001/persons',personObj)
      .then (resp=>{
        setPersons(persons.concat(resp.data));
        setNewName('');
        setNewPhone('');
      });
    }
  };

  useEffect(()=> {axios.get('http://localhost:3001/persons').then (resp =>{setPersons(resp.data)})},[]);

  return (
      <div>

        <h2>Puhelinluettelo</h2>
        <NewForm addPerson={addPerson} newName={newName} onNameChange={onNameChange} newPhone={newPhone} onPhoneChange={onPhoneChange}/>
        <h2>Numerot</h2>
        <Filter search={search} func={onSearchChange}/>
        <PrintOut list={persons} search={search}/>
      </div>
  )

};

export default App
