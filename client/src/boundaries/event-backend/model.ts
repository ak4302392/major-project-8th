import mongoose from 'mongoose';

export interface CreateEventRequestPayload {
  name: string;
  desc: string;
  clubName: string;
  clubId: string;
  eventDate: Date;
  registeredMembers: string[];
  images: string[];
  category: string;
}

export interface GetEventPayload {
  id: string;
  name: string;
  desc: string;
  clubName: string;
  clubId: string;
  eventDate: Date;
  registeredMembers: string[];
  images: string[];
  category: string;
}

export interface CreateEventResponsePayload {
  events: GetEventPayload[];
}
