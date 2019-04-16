import React, { useState, useEffect } from 'react'
import catalogService from '../services/communication'

const PrintOut = ({list, search, onDelete}) => {
  const names = () => list.map((singleName) => {
    if (singleName.name.toLowerCase().indexOf(search)!==-1){
      return <Name name={singleName} key={singleName.id} onDelete={onDelete}/>}
    else {return ''}
  });
  return (<div>{names()}</div>)
};

const Name = ({name, onDelete}) => {
  return (
      <div>{name.name} {name.number} <button id={name.id} name={name.name} onClick={onDelete}>poista</button></div>
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
    e.preventDefault();
    if (persons.some((person) =>person.name===newName)) {window.alert(`${newName} on jo luettelossa`)}
    else {
      const personObj = {name: newName, number: newPhone};
      catalogService.createNew(personObj).then(resp => {
        setPersons(persons.concat(resp));
        setNewName('');
        setNewPhone('');
      });
    }
  };

  const deletePerson = (e) => {
    if (window.confirm('Poistetaanko '+e.target.name)) {
      catalogService.deletePerson(e.target.id)
      .then(() => catalogService.getAll())
      .then(updateInfo => setPersons(updateInfo));
    }
  };

  useEffect(() => {
    catalogService.getAll().then(initialInfo => setPersons(initialInfo))}, []);

  return (
      <div>
        <h2>Puhelinluettelo</h2>
        <NewForm addPerson={addPerson} newName={newName} onNameChange={onNameChange} newPhone={newPhone} onPhoneChange={onPhoneChange}/>
        <h2>Numerot</h2>
        <Filter search={search} func={onSearchChange}/>
        <PrintOut list={persons} search={search} onDelete={deletePerson}/>
      </div>
  )

};

export default App
