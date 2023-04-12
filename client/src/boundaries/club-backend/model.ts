import { GetEventPayload } from '../event-backend/model';

export interface OrganizerLoginRequestPayload {
  clubId: string;
  email: string;
  password: string;
}

export interface events {}

export interface memory {
  name: string;
  desc: string;
  image: string;
}

export interface club {
  clubId: string;
  name: string;
  desc: string;
  images: string[];
  industryType: string;
  upcomingEvents: [];
  cordinatorName: string;
  memories: memory[];
}

export interface OrganizerLoginResponsePayload {
  token: string;
  club: club;
  events: GetEventPayload[];
}

export interface organizerAccount {
  id: string;
  password: string;
}
export interface cordinatorAccount {
  id: string;
  password: string;
}
export interface accounts {
  orgAccount: organizerAccount;
  corAccount: cordinatorAccount;
}
export interface createClubDataType {
  clubId: string;
  name: string;
  desc: string;
  images: string[];
  industryType: string;
  accounts: accounts;
  upcomingEvents: string[];
  cordinatorName: string;
  memories: string[];
}
