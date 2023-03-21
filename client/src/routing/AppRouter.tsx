import { Box } from '@mui/material';
import { createEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isUserAuthenticated } from '../components/auth/authSlice';
import Login from '../components/auth/Login';
import OrganizerLogin from '../components/auth/OrganizerLogin';
import { Signup } from '../components/auth/Signup';
import { UserDashboard } from '../components/dashboard/UserDashboard';
import { OrganizerDashboard } from '../components/dashboard/OrganizerDashboard';
import CreateEvent from '../components/evnt/Create';
import { Events } from '../components/evnt/Events';
import UpdateEvent from '../components/evnt/Update';
import Footer from '../components/footer/Footer';
import { HomePage } from '../components/home/Home';
import MainLayout from '../components/layout/main-layout';
import { Navbar } from '../components/navbar/Navbar';
import { AppRoutes } from './routes';
import Event from '../components/evnt/Event';

export default function AppRouter() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const authenticationPath = '/login';

  return (
    <BrowserRouter>
      <Box display='flex' flexDirection='column' sx={{ minHeight: '100vh' }}>
        <Box flex='1 0 auto'>
          <Navbar />
        </Box>
        <Routes>
          <Route path={AppRoutes.DEFAULT} element={<HomePage />} />
          <Route path={AppRoutes.SIGNUP} element={<Signup />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.ORGANIGER_LOGIN} element={<OrganizerLogin />} />
          <Route path={AppRoutes.EVENTS} element={<Events />} />
          <Route path={AppRoutes.EVENT} element={<Event />} />
          <Route path={AppRoutes.CREATE_EVENT} element={<CreateEvent />} />
          <Route path={AppRoutes.UPDATE_EVENT} element={<UpdateEvent />} />
          <Route path={AppRoutes.USER_DASHBOARD} element={<UserDashboard />} />
          <Route path={AppRoutes.ORGANIZER_DASHBOARD} element={<OrganizerDashboard />} />
        </Routes>
        <Box flexShrink='0'>
          <Footer />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
