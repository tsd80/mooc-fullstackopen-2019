import React, { useState } from 'react'

const PrintOut = (props) => {
  let i=0;
  const names = () => props.list.map((name) => {i++;return <Name name={name} key={i}/>});
  return (<div>{names()}</div>)
};

const Name = (props) => {
  return (
      <div>{props.name.name}</div>
  )
};

const App = () => {
  const [ persons, setPersons] = useState([
    {name: 'Arto Hellas' },
    {name: 'Esko Ukkonen'}
  ]);
  const [ newName, setNewName ] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName
    };
    setPersons(persons.concat(personObj));
    setNewName('');
  };

  const onNameChage = (e) => setNewName(e.target.value);


  return (
      <div>

        <h2>Puhelinluettelo</h2>
        <form onSubmit={addPerson}>
          <div>
            nimi: <input value={newName} onChange={onNameChage}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <PrintOut list={persons}/>
      </div>
  )

};

export default App
