import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) =>{
  return (
      <div>find countries: <input value={props.search} onChange={props.func}/></div>
  )
};

const Results = (props) => {
  //console.log(props.list[150], props.search);

  const countryList = () => props.list
  .filter(country => country.name.toLowerCase().indexOf(props.search)!==-1)
  .map(country =><Country name={country} key={country.name}/>);

  if (countryList().length>10) {return (<div>Too many matches, specify another filter</div>)}
  else if (countryList().length>1) {return (<div>{countryList()}</div>)}
  else if (countryList().length===1) {return (<div><CountryFull data={countryList()}/></div>)}
  else {return ''}

};

const Country = (props) => {
  return (<div>Country {props.name.name}</div>)
};

const CountryFull = (props) => {
  let info = props.data[0].props.name;
  console.log(info);
  const getLangs = () => info.languages.map (lang=><li key={lang.iso639_1}>{lang.name}</li>);
  return (
      <div>
        <h2>{info.name}</h2>
        <div>capital {info.capital}</div>
        <div>population {info.population}</div>
        <h3>Languages</h3>
        <ul>{getLangs()}</ul>
        <div><img src={info.flag} alt="Logo" height="100"/></div>
      </div>
  )
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const onSearchChange = (e) => setSearch(e.target.value);

  useEffect(()=> {axios.get('https://restcountries.eu/rest/v2/all').then (resp =>{setCountries(resp.data)})},[]);

  return (
      <div>
        <Search search={search} func={onSearchChange}/>
        <Results list={countries} search={search}/>
        <div>Debug: {search}</div>
      </div>
  )

};

export default App
