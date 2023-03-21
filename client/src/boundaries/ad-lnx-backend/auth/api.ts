import axios from 'axios';
import { GoogleLoginRequest, LoginRequestPayload, RegisterRequestPayload } from './model';

const login = async (payload: LoginRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/auth/login', payload);

const googleLogin = async (payload: GoogleLoginRequest) =>
  axios.post('http://localhost:4001/api/v1/auth/login-google', payload);

const register = async (payload: RegisterRequestPayload) =>
  axios.post('http://localhost:4001/api/v1/auth/sign-up', payload);

export { login, googleLogin, register };
