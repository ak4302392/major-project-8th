import axios from 'axios';
import { CreateEventRequestPayload } from './model';

const CreateEvent = async (payload: CreateEventRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/events/create', payload);

// const googleLogin = async (payload: GoogleLoginRequest) =>
//   axios.post('http://localhost:4001/api/v1/club/create', payload);

export { CreateEvent };
