import axios from 'axios';
import { CreateEventRequestPayload } from './model';

export const CreateEventApi = async (payload: CreateEventRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/events/create', payload);

export const getAllEventsAPI = async () =>
  axios.get('http://localhost:4001/api/v1/events/getAllEvents');

export const registerToEvent = async (payload: { userId: string; eventId: string }) => {
  axios.post('http://localhost:4001/api/v1/events/register', payload);
};
// const googleLogin = async (payload: GoogleLoginRequest) =>
//   axios.post('http://localhost:4001/api/v1/club/create', payload);
