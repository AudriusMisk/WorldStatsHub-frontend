import React, { useState } from 'react';
import axios from 'axios';

function CountryCRUD({ countries, refreshCountries }) {
  const [newCountry, setNewCountry] = useState({
    name: '',
    officialName: '',
    capital: '',
    population: '',
    languages: '',
    currencies: '',
    region: ''
  });

  const addCountry = () => {
    axios.post('http://localhost:8080/api/countries', {
      ...newCountry,
      population: Number(newCountry.population),
      languages: newCountry.languages ? newCountry.languages.split(",").map(lang => lang.trim()) : [],
      currencies: newCountry.currencies ? newCountry.currencies.split(",").map(curr => curr.trim()) : [],
      region: newCountry.region ? { id: Number(newCountry.region) } : null
    })
      .then(() => {
        refreshCountries();
        setNewCountry({ 
          name: '',
          officialName: '',
          capital: '',
          population: '',
          languages: '',
          currencies: '',
          region: '' });
      });
  };

  const updateCountry = (id, updatedCountry) => {
    axios.put(`http://localhost:8080/api/countries/${id}`, updatedCountry)
      .then(() => refreshCountries());
  };

  const deleteCountry = (id) => {
    axios.delete(`http://localhost:8080/api/countries/${id}`)
      .then(() => refreshCountries());
  };

  return (
    <div>
    
      <h3>Countries List</h3>
      {countries.map(country => (
        <div key={country.id}>
          <input defaultValue={country.name} onChange={e => country.name = e.target.value} />
          <input type="number" defaultValue={country.population} onChange={e => country.population = e.target.value} />
          <button onClick={() => updateCountry(country.id, country)}>Update</button>
          <button onClick={() => deleteCountry(country.id)}>Delete</button>
        </div>
      ))}

      <h3>Add New Country</h3>
      <input placeholder="Name" value={newCountry.name} onChange={e => setNewCountry({...newCountry, name: e.target.value})} />
      <input placeholder="Official Name" value={newCountry.officialName} onChange={e => setNewCountry({...newCountry, officialName: e.target.value})} />
      <input placeholder="Capital" value={newCountry.capital} onChange={e => setNewCountry({...newCountry, capital: e.target.value})} />
      <input placeholder="Population" type="number" value={newCountry.population} onChange={e => setNewCountry({...newCountry, population: e.target.value})} />
      <input placeholder="Languages (comma-separated)" value={newCountry.languages} onChange={e => setNewCountry({...newCountry, languages: e.target.value})} />
      <input placeholder="Currencies (comma-separated)" value={newCountry.currencies} onChange={e => setNewCountry({...newCountry, currencies: e.target.value})} />
      <input placeholder="Region ID" type="number" value={newCountry.region} onChange={e => setNewCountry({...newCountry, region: e.target.value})} />
      <button onClick={addCountry}>Add Country</button>

    </div>
  );
}

export default CountryCRUD;