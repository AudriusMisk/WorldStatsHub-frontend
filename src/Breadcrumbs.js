import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav style={{ padding: '10px 0' }}>
      <Link to="/">Regions</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={name}>
            {' > '}
            {isLast ? (
              <span>{decodeURIComponent(name)}</span>
            ) : (
              <Link to={routeTo}>{decodeURIComponent(name)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;