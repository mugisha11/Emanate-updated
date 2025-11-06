import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './src/styles/animations.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgrammesPage from './pages/ProgrammesPage';
import ProgrammeDetailPage from './pages/ProgrammeDetailPage';
import ObjectiveDetailPage from './pages/ObjectiveDetailPage';
import PublicationsPage from './pages/research/PublicationsPage';
import CaseStudiesPage from './pages/research/CaseStudiesPage';
import DataPage from './pages/research/DataPage';
import ReportsPage from './pages/resources/ReportsPage';
import DigitalLibraryPage from './pages/resources/DigitalLibraryPage';
import KeyAreasPage from './pages/areas/KeyAreasPage';
import PublicHealthPage from './pages/areas/PublicHealthPage';
import EducationPage from './pages/areas/EducationPage';
import GenderEqualityPage from './pages/areas/GenderEqualityPage';
import YouthDevelopmentPage from './pages/areas/YouthDevelopmentPage';
import PolicyAdvisoryPage from './pages/areas/PolicyAdvisoryPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import StoriesPage from './pages/StoriesPage';
import DonatePage from './pages/DonatePage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import JoinPage from './pages/JoinPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:id" element={<ProgrammeDetailPage />} />
          <Route path="/objectives/:slug" element={<ObjectiveDetailPage />} />
          <Route path="/research/publications" element={<PublicationsPage />} />
          <Route path="/research/case-studies" element={<CaseStudiesPage />} />
          <Route path="/research/data" element={<DataPage />} />
          <Route path="/resources/reports" element={<ReportsPage />} />
          <Route path="/resources/library" element={<DigitalLibraryPage />} />
          <Route path="/areas" element={<KeyAreasPage />} />
          <Route path="/areas/health" element={<PublicHealthPage />} />
          <Route path="/areas/education" element={<EducationPage />} />
          <Route path="/areas/gender" element={<GenderEqualityPage />} />
          <Route path="/areas/youth" element={<YouthDevelopmentPage />} />
          <Route path="/areas/policy" element={<PolicyAdvisoryPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/stories/:slug" element={<StoriesPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
