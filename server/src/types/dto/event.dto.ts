import mongoose from "mongoose";

export interface Event {
  name: string;
  desc: string;
  clubName: string;
  clubId: string;
  eventDate: Date;
  registeredMembers: string[];
  images: string[];
  category: string;
}

export interface EventReturn {
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

export interface registeredUsersResponse {
  sNo: Number;
  name: string;
  phone: string;
  email: string;
  isManitStudent: string;
}
