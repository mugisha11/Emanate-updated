import React from 'react';
import InfoPage from '../../components/InfoPage';
import { Link } from 'react-router-dom';

const KeyAreasPage: React.FC = () => {
  return (
    <InfoPage
      title="Key Areas"
      intro={(
        <>
          EMANATE focuses on a set of cross-cutting areas. Explore each area below:
          <div className="mt-4 space-x-3">
            <Link to="/areas/health" className="text-cyan-600 font-semibold">Public Health</Link>
            <Link to="/areas/education" className="text-cyan-600 font-semibold">Education</Link>
            <Link to="/areas/gender" className="text-cyan-600 font-semibold">Gender Equality</Link>
            <Link to="/areas/youth" className="text-cyan-600 font-semibold">Youth Development</Link>
            <Link to="/areas/policy" className="text-cyan-600 font-semibold">Policy Advisory</Link>
          </div>
        </>
      )}
      sections={[
        { heading: 'Overview', body: (<p>Short descriptions of each key area and how EMANATE works within them.</p>) },
      ]}
    />
  );
};

export default KeyAreasPage;
