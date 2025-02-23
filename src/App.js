import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import RegionPage from './RegionPage';
import CountryPage from './CountryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/regions/:id" element={<RegionPage />} />
        <Route path="/countries/:id" element={<CountryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
