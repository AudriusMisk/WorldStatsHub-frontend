import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CountryCRUD from './CountryCRUD';

function RegionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  // ✅ Define fetchData()
  const fetchData = () => {
    axios.get(`http://localhost:8080/api/regions/${id}/countries`)
      .then(response => setCountries(response.data));
  };

  useEffect(() => {
    fetchData();  // ✅ Use fetchData here
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      
      <h2>Countries</h2>
      <CountryCRUD countries={countries} refreshCountries={fetchData} />
      
      <ul>
        {countries.map(country => (
          <li key={country.id}>
            <Link to={`/countries/${country.id}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegionPage;