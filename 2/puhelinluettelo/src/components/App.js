import React, { useState } from 'react'

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
      <div>{props.name.name} {props.name.numero}</div>
  )
};

const Filter = (props) => {
  return (
      <div>rajaa näyettäviä: <input value={props.search} onChange={props.func}/></div>
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
  const [ persons, setPersons] = useState([
    {name: 'Arto Hellas', numero: '045-123456' },
    {name: 'Esko Ukkonen', numero: '09-223345'},
    {name: 'Martti Tienari', numero: '040-123456'},
    {name: 'Arto Järvinen', numero: '040-123532'},
    {name: 'Lea Kutvonen', numero: '040-12344564'}
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');

  const addPerson = (e) => {
    console.log(e.target.name);
    e.preventDefault();

    if (persons.some((person) =>person.name===newName)) {window.alert(`${newName} on jo luettelossa`)}
    else {
      const personObj = {name: newName, numero: newPhone};
      setPersons(persons.concat(personObj));
      setNewName('');
      setNewPhone('');
    }
  };

  const onNameChange = (e) => setNewName(e.target.value);
  const onPhoneChange = (e) => setNewPhone(e.target.value);
  const onSearchChange = (e) => setSearch(e.target.value);

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
