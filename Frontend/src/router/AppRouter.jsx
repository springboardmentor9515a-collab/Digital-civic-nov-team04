import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import HelpSupport from '../pages/help&support/helpsupport';
import DashboardCard from '../components/dashboard/DashboardCard';
import PetitionList from '../pages/petitions/PetitionList';
import CreatePetition from '../pages/petitions/CreatePetition';
import PollList from '../pages/polls/PollList';
import CreatePoll from '../pages/polls/CreatePoll';
import OfficialDashboard from '../components/official/OfficialDashboard';
import OfficialAnalytics from '../pages/analytics/OfficialAnalytics';
import Reports from '../pages/reports/Reports';
import ResultsDashboard from '../pages/results/ResultsDashboard';
import SearchPage from '../pages/search/SearchPage';
import Settings from '../pages/settings/settings';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Dashboard (TEMP: no auth for preview) */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardCard />} />

        {/* Petitions */}
        <Route path="petitions" element={<PetitionList />} />
        <Route path="petitions/create" element={<CreatePetition />} />
        <Route path="petitions/edit/:id" element={<CreatePetition />} />

        {/* Polls */}
        <Route path="polls" element={<PollList />} />
        <Route path="polls/create" element={<CreatePoll />} />
        <Route path="polls/edit/:id" element={<CreatePoll />} />

        {/* Official */}
        <Route path="official" element={<OfficialDashboard />} />
        <Route path="analytics" element={<OfficialAnalytics />} />
        <Route path="official/review" element={<PetitionList />} />

        {/* Other */}
        <Route path="results" element={<ResultsDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<HelpSupport />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
