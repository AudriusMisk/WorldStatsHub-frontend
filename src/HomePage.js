import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/regions')
      .then(response => setRegions(response.data));
  }, []);

  return (
    <div>
      <h1>Regions</h1>
      <ul>
        {regions.map(region => (
          <li key={region.id}>
            <Link to={`/regions/${region.id}`}>{region.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;