import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Home from '../pages/Home.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import DashboardCard from '../components/dashboard/DashboardCard.jsx';

import PetitionList from '../pages/petitions/PetitionList.jsx';
import CreatePetition from '../pages/petitions/CreatePetition.jsx';

import PollList from '../pages/polls/PollList.jsx';
import CreatePoll from '../pages/polls/CreatePoll.jsx';

import OfficialDashboard from '../components/official/OfficialDashboard.jsx';
import OfficialAnalytics from '../pages/analytics/OfficialAnalytics.jsx';
import Reports from '../pages/reports/Reports.jsx';
import ResultsDashboard from '../pages/results/ResultsDashboard.jsx';
import SearchPage from '../pages/search/SearchPage.jsx';
import Settings from '../pages/settings/settings.jsx';
import HelpSupport from '../pages/help&support/helpsupport.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardCard />} />

        <Route path="petitions" element={<PetitionList />} />
        <Route path="petitions/create" element={<CreatePetition />} />
        <Route path="petitions/edit/:id" element={<CreatePetition />} />

        <Route path="polls" element={<PollList />} />
        <Route path="polls/create" element={<CreatePoll />} />
        <Route path="polls/edit/:id" element={<CreatePoll />} />

        <Route path="official" element={<OfficialDashboard />} />
        <Route path="analytics" element={<OfficialAnalytics />} />
        <Route path="official/review" element={<PetitionList />} />

        <Route path="results" element={<ResultsDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<HelpSupport />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
