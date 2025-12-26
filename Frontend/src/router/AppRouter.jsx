// // // import React from 'react';
// // // import { Routes, Route, Navigate } from 'react-router-dom';

// // // // Import pages
// // // import Home from '../pages/Home';
// // // import Login from '../pages/auth/Login';
// // // import Register from '../pages/auth/Register';
// // // import Dashboard from '../pages/dashboard/Dashboard';
// // // import HelpSupport from '../pages/help&support/helpsupport';
// // // import DashboardCard from '../components/dashboard/DashboardCard';
// // // import PetitionList from '../pages/petitions/PetitionList';
// // // import CreatePetition from '../pages/petitions/CreatePetition';
// // // import PollList from '../pages/polls/PollList';
// // // import CreatePoll from '../pages/polls/CreatePoll';
// // // import OfficialDashboard from '../components/official/OfficialDashboard';
// // // import OfficialAnalytics from '../pages/analytics/OfficialAnalytics';
// // // import Reports from '../pages/reports/Reports';
// // // import ResultsDashboard from '../pages/results/ResultsDashboard';
// // // import SearchPage from '../pages/search/SearchPage';
// // // import Settings from '../pages/settings/settings';

// // // const AppRouter = () => {
// // //   return (
// // //     <Routes>
// // //       {/* Public routes */}
// // //       <Route path="/" element={<Home />} />
// // //       <Route path="/login" element={<Login />} />
// // //       <Route path="/register" element={<Register />} />
// // //       <Route path="/search" element={<SearchPage />} />

// // //       {/* Dashboard (TEMP: no auth for preview) */}
// // //       <Route path="/dashboard" element={<Dashboard />}>
// // //         <Route index element={<DashboardCard />} />

// // //         {/* Petitions */}
// // //         <Route path="petitions" element={<PetitionList />} />
// // //         <Route path="petitions/create" element={<CreatePetition />} />
// // //         <Route path="petitions/edit/:id" element={<CreatePetition />} />

// // //         {/* Polls */}
// // //         <Route path="polls" element={<PollList />} />
// // //         <Route path="polls/create" element={<CreatePoll />} />
// // //         <Route path="polls/edit/:id" element={<CreatePoll />} />

// // //         {/* Official */}
// // //         <Route path="official" element={<OfficialDashboard />} />
// // //         <Route path="analytics" element={<OfficialAnalytics />} />
// // //         <Route path="official/review" element={<PetitionList />} />

// // //         {/* Other */}
// // //         <Route path="results" element={<ResultsDashboard />} />
// // //         <Route path="reports" element={<Reports />} />
// // //         <Route path="settings" element={<Settings />} />
// // //         <Route path="help" element={<HelpSupport />} />
// // //       </Route>

// // //       {/* Catch-all */}
// // //       <Route path="*" element={<Navigate to="/" />} />
// // //     </Routes>
// // //   );
// // // };

// // // export default AppRouter;


// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import { useAuth } from '../hooks/useAuth'; // Ensure this hook is copied to your new repo

// // // Import pages
// // import Home from '../pages/Home';
// // import Login from '../pages/auth/Login';
// // import Register from '../pages/auth/Register';
// // import Dashboard from '../pages/dashboard/Dashboard';
// // import HelpSupport from '../pages/help-support/helpsupport';
// // import DashboardCard from '../components/dashboard/DashboardCard';
// // import PetitionList from '../pages/petitions/PetitionList';
// // import CreatePetition from '../pages/petitions/CreatePetition';
// // import PollList from '../pages/polls/PollList';
// // import CreatePoll from '../pages/polls/CreatePoll';
// // import OfficialDashboard from '../components/official/OfficialDashboard';
// // import OfficialAnalytics from '../pages/analytics/OfficialAnalytics';
// // import Reports from '../pages/reports/Reports';
// // import ResultsDashboard from '../pages/results/ResultsDashboard';
// // import SearchPage from '../pages/search/SearchPage';
// // import Settings from '../pages/settings/settings';

// // // Protected Route Component - Required for Role-Based Access
// // const ProtectedRoute = ({ children }) => {
// //   const { user, loading } = useAuth();

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return user ? children : <Navigate to="/login" />;
// // };

// // const AppRouter = () => {
// //   return (
// //     <Routes>
// //       {/* Public routes */}
// //       <Route path="/" element={<Home />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />
// //       <Route path="/search" element={<SearchPage />} />

// //       {/* Protected Dashboard Routes */}
// //       <Route path="/dashboard" element={
// //         <ProtectedRoute>
// //           <Dashboard />
// //         </ProtectedRoute>
// //       }>
// //         <Route index element={<DashboardCard />} />

// //         {/* Petitions Routes - Milestone 2 */}
// //         <Route path="petitions" element={<PetitionList />} />
// //         <Route path="petitions/create" element={<CreatePetition />} />
// //         <Route path="petitions/edit/:id" element={<CreatePetition />} />

// //         {/* Polls Routes */}
// //         <Route path="polls" element={<PollList />} />
// //         <Route path="polls/create" element={<CreatePoll />} />
// //         <Route path="polls/edit/:id" element={<CreatePoll />} />

// //         {/* Official Routes */}
// //         <Route path="official" element={<OfficialDashboard />} />
// //         <Route path="analytics" element={<OfficialAnalytics />} />
// //         <Route path="official/review" element={<PetitionList />} />

// //         {/* Other Routes */}
// //         <Route path="results" element={<ResultsDashboard />} />
// //         <Route path="reports" element={<Reports />} />
// //         <Route path="settings" element={<Settings />} />
// //         <Route path="help" element={<HelpSupport />} />
// //       </Route>

// //       {/* Catch-all */}
// //       <Route path="*" element={<Navigate to="/" />} />
// //     </Routes>
// //   );
// // };

// // export default AppRouter;

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// // Import pages - Core & Auth
// import Home from '../pages/Home';
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import Dashboard from '../pages/dashboard/Dashboard';
// import DashboardCard from '../components/dashboard/DashboardCard';

// // Import pages - Petitions (Milestone 2)
// import PetitionList from '../pages/petitions/PetitionList';
// import CreatePetition from '../pages/petitions/CreatePetition';

// // Import pages - Search & Help (Assuming you copied these or fixed the path)
// //import SearchPage from '../pages/search/SearchPage';
// // Note: Ensure folder is named 'help-support' or 'help&support' matching your file system
// // import HelpSupport from '../pages/help-support/helpsupport'; 

// // COMMENTED OUT: Components not yet copied to organization repo
// // import PollList from '../pages/polls/PollList';
// // import CreatePoll from '../pages/polls/CreatePoll';
// // import OfficialDashboard from '../components/official/OfficialDashboard';
// // import OfficialAnalytics from '../pages/analytics/OfficialAnalytics';
// // import Reports from '../pages/reports/Reports';
// // import ResultsDashboard from '../pages/results/ResultsDashboard';
// // import Settings from '../pages/settings/settings';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// const AppRouter = () => {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/search" element={<SearchPage />} />

//       {/* Protected Dashboard Routes */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       }>
//         <Route index element={<DashboardCard />} />

//         {/* Petitions Routes - Milestone 2 (Active) */}
//         <Route path="petitions" element={<PetitionList />} />
//         <Route path="petitions/create" element={<CreatePetition />} />
//         <Route path="petitions/edit/:id" element={<CreatePetition />} />

//         {/* Polls Routes (Commented out until files are copied) */}
//         {/* <Route path="polls" element={<PollList />} /> */}
//         {/* <Route path="polls/create" element={<CreatePoll />} /> */}
//         {/* <Route path="polls/edit/:id" element={<CreatePoll />} /> */}

//         {/* Official Routes (Commented out until files are copied) */}
//         {/* <Route path="official" element={<OfficialDashboard />} /> */}
//         {/* <Route path="analytics" element={<OfficialAnalytics />} /> */}
//         {/* <Route path="official/review" element={<PetitionList />} /> */}

//         {/* Other Routes (Commented out until files are copied) */}
//         {/* <Route path="results" element={<ResultsDashboard />} /> */}
//         {/* <Route path="reports" element={<Reports />} /> */}
//         {/* <Route path="settings" element={<Settings />} /> */}
//         {/* <Route path="help" element={<HelpSupport />} /> */}
//       </Route>

//       {/* Catch-all */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

// export default AppRouter;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Import pages - Core & Auth
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardCard from '../components/dashboard/DashboardCard';

// Import pages - Petitions (Milestone 2)
import PetitionList from '../pages/petitions/PetitionList';
import CreatePetition from '../pages/petitions/CreatePetition';

// Import pages - Search & Help (Assuming you copied these or fixed the path)
// import SearchPage from '../pages/search/SearchPage';
// Note: Ensure folder is named 'help-support' or 'help&support' matching your file system
// import HelpSupport from '../pages/help-support/helpsupport'; 

// COMMENTED OUT: Components not yet copied to organization repo
// import PollList from '../pages/polls/PollList';
// import CreatePoll from '../pages/polls/CreatePoll';
// import OfficialDashboard from '../components/official/OfficialDashboard';
// import OfficialAnalytics from '../pages/analytics/OfficialAnalytics';
// import Reports from '../pages/reports/Reports';
// import ResultsDashboard from '../pages/results/ResultsDashboard';
// import Settings from '../pages/settings/settings';

// Protected Route Component
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
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Search Route - Commented out because import is commented out */}
      {/* <Route path="/search" element={<SearchPage />} /> */}

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardCard />} />

        {/* Petitions Routes - Milestone 2 (Active) */}
        <Route path="petitions" element={<PetitionList />} />
        <Route path="petitions/create" element={<CreatePetition />} />
        <Route path="petitions/edit/:id" element={<CreatePetition />} />

        {/* Polls Routes (Commented out until files are copied) */}
        {/* <Route path="polls" element={<PollList />} /> */}
        {/* <Route path="polls/create" element={<CreatePoll />} /> */}
        {/* <Route path="polls/edit/:id" element={<CreatePoll />} /> */}

        {/* Official Routes (Commented out until files are copied) */}
        {/* <Route path="official" element={<OfficialDashboard />} /> */}
        {/* <Route path="analytics" element={<OfficialAnalytics />} /> */}
        {/* <Route path="official/review" element={<PetitionList />} /> */}

        {/* Other Routes (Commented out until files are copied) */}
        {/* <Route path="results" element={<ResultsDashboard />} /> */}
        {/* <Route path="reports" element={<Reports />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="help" element={<HelpSupport />} /> */}
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;