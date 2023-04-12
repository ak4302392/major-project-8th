import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isUserAuthenticated } from '../components/auth/authSlice';
import Login from '../components/auth/Login';
import OrganizerLogin from '../components/auth/OrganizerLogin';
import { Signup } from '../components/auth/Signup';
import { OrganizerDashboard } from '../components/dashboard/organizer-dashboard/OrganizerDashboard';
import CreateEvent from '../components/evnt/CreateEvent';
import { Events } from '../components/evnt/Events';
import UpdateEvent from '../components/evnt/Update';
import { Footer } from '../components/footer/Footer';
import { HomePage } from '../components/home/Home';
import { AppRoutes } from './routes';
import Event from '../components/evnt/Event';
import { ClubDashboard } from '../components/dashboard/organizer-dashboard/ClubDashboard';
import { ClubEventDetails } from '../components/dashboard/organizer-dashboard/ClubEventDetails';
import { ClubAllEvents } from '../components/dashboard/organizer-dashboard/ClubAllEvents';
import { Navbar } from '../components/navbar/Navbar';
import { UserAllEvents } from '../components/dashboard/user-dashboard/UserAllEvents';
import { UserEventDetails } from '../components/dashboard/user-dashboard/UserEventDetails';
import { UserDashboard } from '../components/dashboard/user-dashboard/UserDashboard';
import { CommonClubDetails } from '../components/dashboard/CommonClubDetails';
import { OtpVerification } from '../components/auth/OtpVerification';
import { CreateClub } from '../components/dashboard/CreateClub';

export default function AppRouter() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const authenticationPath = '/login';

  return (
    <BrowserRouter>
      <Box
        display='flex'
        flexDirection='column'
        sx={{ minHeight: '100vh', backgroundColor: 'white' }}
      >
        <Box flex='1 0 auto'>
          <Navbar />
        </Box>
        <Routes>
          {/* user routes */}
          <Route path={AppRoutes.USER_ALL_EVENTS} element={<UserAllEvents />} />
          <Route path={AppRoutes.USER_DASHBOARD} element={<UserDashboard />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.SIGNUP} element={<Signup />} />
          <Route path={AppRoutes.OTP_VERIFICATION} element={<OtpVerification />} />
          <Route path={AppRoutes.USER_EVENT_DETAILS} element={<UserEventDetails />} />

          {/* organizer Routes */}
          <Route path={AppRoutes.ALL_EVENTS} element={<ClubAllEvents />} />
          <Route path={AppRoutes.ORGANIGER_LOGIN} element={<OrganizerLogin />} />
          <Route path={AppRoutes.EVENTS} element={<Events />} />
          <Route path={AppRoutes.CREATE_EVENT} element={<CreateEvent />} />
          <Route path={AppRoutes.CLUB_DETAILS} element={<ClubDashboard />} />
          <Route path={AppRoutes.EVENT_DETAILS} element={<ClubEventDetails />} />
          <Route path={AppRoutes.EVENT} element={<Event />} />
          <Route path={AppRoutes.UPDATE_EVENT} element={<UpdateEvent />} />
          <Route path={AppRoutes.ORGANIZER_DASHBOARD} element={<OrganizerDashboard />} />
          <Route path={AppRoutes.CLUB_ALL_EVENTS} element={<ClubAllEvents />} />
          <Route path={AppRoutes.CLUB_EVENT_DETAILS} element={<ClubEventDetails />} />
          <Route path={AppRoutes.CREATE_CLUB} element={<CreateClub />} />

          {/* common routes for both  */}
          <Route path={AppRoutes.DEFAULT} element={<HomePage />} />
          <Route path={AppRoutes.COMMONN_CLUB_DETAILS} element={<CommonClubDetails />} />
        </Routes>
        <Box flexShrink='0' mt={[2, 5, 10]}>
          <Footer />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
