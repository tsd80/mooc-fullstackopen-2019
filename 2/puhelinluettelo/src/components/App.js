import React, { useState } from 'react'

const PrintOut = (props) => {
  let i=0;

  //notes.filter(note => note.important);


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
        <form onSubmit={addPerson}>
          <div>nimi: <input value={newName} onChange={onNameChange} name="test"/></div>
          <div>puhelinnumero: <input value={newPhone} onChange={onPhoneChange}/></div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>rajaa näyettäviä: <input value={search} onChange={onSearchChange}/></div>
        <PrintOut list={persons} search={search}/>
      </div>
  )

};

export default App
