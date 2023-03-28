import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  phone: string;
  isManitStudent: string;
  scholarNumber: string;
  eventsRegistered: string[];
  password: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface UserDataReturn {
  id: string;
  name: string;
  email: string;
  phone: string;
  isManitStudent: string;
  scholarNumber: string;
  eventsRegistered: string[];
}
