import axios from 'axios';
import { createClubDataType, OrganizerLoginRequestPayload } from './model';

const OrganizerLogin = async (payload: OrganizerLoginRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/club/login', payload);

// const googleLogin = async (payload: GoogleLoginRequest) =>
//   axios.post('http://localhost:4001/api/v1/club/create', payload);

interface getClubIdPayload {
  id: string;
}
const getClubById = async (payload: getClubIdPayload) => {
  return axios.post('http://localhost:4001/api/v1/club/getClubById', payload);
};

const createClubAPI = async (payload: createClubDataType) =>
  axios.post('http://localhost:4001/api/v1/club/create', payload);

export { OrganizerLogin, getClubById, createClubAPI };
