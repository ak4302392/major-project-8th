import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  phone: string;
  isManitStudent: string;
  scholarNumber: string;
  eventsRegistered: [];
  password: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
