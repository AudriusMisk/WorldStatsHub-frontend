import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';

function CountryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/countries/${id}`)
      .then(response => setCountry(response.data));
  }, [id]);

  if (!country) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button> {/* Simple back button */}
      
      <h2>{country.name} ({country.officialName})</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Languages:</strong> {country.languages.join(", ")}</p>
      <p><strong>Currencies:</strong> {country.currencies.join(", ")}</p>
    </div>
  );
}

export default CountryPage;