import React from 'react';
import InfoPage from '../../components/InfoPage';

const ReportsPage: React.FC = () => {
  return (
    <InfoPage
      title="Reports"
      intro={"Policy reports, annual reports and program evaluations produced by EMANATE."}
      sections={[
        { heading: 'Annual Reports', body: (<p>List of annual reports with summaries and download links.</p>) },
        { heading: 'Program Evaluations', body: (<p>Evaluation findings and recommendations from program reviews.</p>) },
      ]}
    />
  );
};

export default ReportsPage;
