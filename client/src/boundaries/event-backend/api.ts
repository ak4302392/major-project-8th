import axios from 'axios';
import { CreateEventRequestPayload } from './model';

export const CreateEventApi = async (payload: CreateEventRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/events/create', payload);

export const getAllEventsAPI = async () =>
  axios.get('http://localhost:4001/api/v1/events/getAllEvents');

export const registerToEvent = async (payload: { userId: string; eventId: string }) => {
  return axios.post('http://localhost:4001/api/v1/events/register', payload);
};

export const getEventById = async (payload: { id: string }) => {
  return axios.post('http://localhost:4001/api/v1/events/getEventByEventId', payload);
};

export const exportRegisteredUsers = async (payload: string[]) => {
  return axios.post('http://localhost:4001/api/v1/events/exportAllRegisteredUsers', payload, {
    responseType: 'blob',
  });
};

// const googleLogin = async (payload: GoogleLoginRequest) =>
//   axios.post('http://localhost:4001/api/v1/club/create', payload);
