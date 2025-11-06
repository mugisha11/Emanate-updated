import React from 'react';
import InfoPage from '../../components/InfoPage';

const GenderEqualityPage: React.FC = () => {
  return (
    <InfoPage
      title="Gender Equality"
      intro={"EMANATE's gender equality work promotes inclusive policies and programs that reduce disparities and protect rights."}
      sections={[
        { heading: 'Approaches', body: (<p>Community engagement, Men Engage, women economic empowerment, and policy advocacy.</p>) },
      ]}
    />
  );
};

export default GenderEqualityPage;
