import axios from 'axios';
import { GoogleLoginRequest, LoginRequestPayload, RegisterRequestPayload } from './model';

const login = async (payload: LoginRequestPayload) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, payload);

const googleLogin = async (payload: GoogleLoginRequest) =>
  axios.post(`${ process.env.REACT_APP_BACKEND_URL }/api/v1/auth/login-google`, payload);

const register = async (payload: RegisterRequestPayload) =>
  axios.post(`${ process.env.REACT_APP_BACKEND_URL }/api/v1/auth/sign-up`, payload);

const getUserById = async (payload: string) =>
  axios.get(`${ process.env.REACT_APP_BACKEND_URL }/api/v1/auth/getUserById`, { params: { userId: payload } });

const verifyEmailOtpAPI = async (payload: { userId: string; otp: string }) =>
  axios.post(`${ process.env.REACT_APP_BACKEND_URL }/api/v1/auth/sign-up/verify-otp`, payload);

export { login, googleLogin, register, getUserById, verifyEmailOtpAPI };

