import React, { useState } from 'react';
import axios from 'axios';

function CountryCRUD({ countries, refreshCountries }) {
  const [newCountry, setNewCountry] = useState({ name: '', officialName: '', capital: '', population: '' });

  // Add country function
  const addCountry = () => {
    axios.post('http://localhost:8080/api/countries', newCountry)
      .then(() => {
        refreshCountries();
        setNewCountry({ name: '', officialName: '', capital: '', population: '' });
      });
  };

  // Update country function
  const updateCountry = (id, updatedCountry) => {
    axios.put(`http://localhost:8080/api/countries/${id}`, updatedCountry)
      .then(() => refreshCountries());
  };

  // Delete country function
  const deleteCountry = (id) => {
    axios.delete(`http://localhost:8080/api/countries/${id}`)
      .then(() => refreshCountries());
  };

  return (
    <div>
      <h3>Add New Country</h3>
      <input placeholder="Name" value={newCountry.name} onChange={e => setNewCountry({...newCountry, name: e.target.value})} />
      <input placeholder="Official Name" value={newCountry.officialName} onChange={e => setNewCountry({...newCountry, officialName: e.target.value})} />
      <input placeholder="Capital" value={newCountry.capital} onChange={e => setNewCountry({...newCountry, capital: e.target.value})} />
      <input placeholder="Population" type="number" value={newCountry.population} onChange={e => setNewCountry({...newCountry, population: e.target.value})} />
      <button onClick={addCountry}>Add Country</button>

      <h3>Countries List</h3>
      {countries.map(country => (
        <div key={country.id}>
          <input defaultValue={country.name} onChange={e => country.name = e.target.value} />
          <input defaultValue={country.capital} onChange={e => country.capital = e.target.value} />
          <input type="number" defaultValue={country.population} onChange={e => country.population = e.target.value} />
          <button onClick={() => updateCountry(country.id, country)}>Update</button>
          <button onClick={() => deleteCountry(country.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CountryCRUD;