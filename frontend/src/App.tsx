// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import CalendarPage from './pages/CalendarPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import SettingsPage from './pages/SettingsPage';
import PortfolioPage from './pages/PortfolioPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProjectsPage from './pages/ProjectsPage';
import InvoicesPage from './pages/InvoicesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/:id" element={<ClientDetailsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;