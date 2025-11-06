import React from 'react';
import InfoPage from '../../components/InfoPage';

const PublicHealthPage: React.FC = () => {
  return (
    <InfoPage
      title="Public Health"
      intro={"EMANATE's public health work includes research, program design and advocacy to improve population health outcomes."}
      sections={[
        { heading: 'Focus Areas', body: (<p>Maternal & child health, infectious disease surveillance, health systems strengthening.</p>) },
        { heading: 'Programs', body: (<p>Short descriptions of flagship public health programs.</p>) },
      ]}
    />
  );
};

export default PublicHealthPage;
