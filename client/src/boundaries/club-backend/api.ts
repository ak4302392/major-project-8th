import axios from 'axios';
import { OrganizerLoginRequestPayload } from './model';

const OrganizerLogin = async (payload: OrganizerLoginRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/club/login', payload);

// const googleLogin = async (payload: GoogleLoginRequest) =>
//   axios.post('http://localhost:4001/api/v1/club/create', payload);

export { OrganizerLogin };
