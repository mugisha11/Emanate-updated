import React from 'react';
import InfoPage from '../../components/InfoPage';

const YouthDevelopmentPage: React.FC = () => {
  return (
    <InfoPage
      title="Youth Development"
      intro={"Programs to support youth empowerment, skills development and civic participation."}
      sections={[
        { heading: 'Skills & Entrepreneurship', body: (<p>Training and incubation programs supporting youth-led enterprises.</p>) },
        { heading: 'Civic Participation', body: (<p>Initiatives that increase youth engagement in community decision-making.</p>) },
      ]}
    />
  );
};

export default YouthDevelopmentPage;
