export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  token: string;
  user: {
    name: string;
    email: string;
    phone: string;
    isManitStudent: Boolean;
    scholarNumber: string;
    eventsRegistered: [];
    id: string;
  };
}

export interface GoogleLoginRequest {
  credentials: string;
}

export interface RegisterRequestPayload {
  name: string;
  email: string;
  phone: string;
  isManitStudent: Boolean;
  scholarNumber: string;
  password: string;
  passwordConfirm: string;
}
