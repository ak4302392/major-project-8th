import { Request, Response } from "express";
import { UserDocument } from "@/model/user/user.schema";
import { createJWT } from "@/utils/jwt";
import eventRepo from "@/model/events/event.repo";
import clubRepo from "@/model/clubs/club.repo";
import { getEventFromDBEvent } from "./club";
import { EventModel } from "@/model/events/event.schema";
import userRepo from "@/model/user/user.repo";
import { getWebUserFromDBUser } from "./auth";
import { registeredUsersResponse } from "@/types/dto/event.dto";

const bcrypt = require("bcrypt");
const excelJS = require("exceljs");

/**
 * Create user
 *
 * @param {Request} req
 * @param {Response} res
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      desc,
      clubName,
      clubId,
      eventDate,
      registeredMembers,
      images,
      category,
    } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Event name is required",
      });
    }

    if (!desc) {
      return res.status(400).send({
        message: "Event description is required",
      });
    }

    if (!clubName) {
      return res.status(400).send({
        message: "The associated club name is required",
      });
    }

    if (!clubId) {
      return res.status(400).send({
        message: "Club Id is required",
      });
    }

    if (!eventDate) {
      return res.status(400).send({
        message: "Date of event is required",
      });
    }

    if (!images) {
      return res.status(400).send({
        message: "Some images of the event are required",
      });
    }

    if (!category) {
      return res.status(400).send({
        message: "Category of the event is required",
      });
    }

    const associatedClub = await clubRepo.findOne({ clubId: clubId });

    if (!associatedClub) {
      return res.status(400).send({
        message: "No club exists with the provided club id.",
      });
    }
    const newEvent = await eventRepo.create({
      name: name,
      desc: desc,
      clubName: clubName,
      clubId: clubId,
      eventDate: eventDate,
      registeredMembers: [],
      images: images,
      category: category,
    });

    const eventId: string = newEvent.id;

    if (associatedClub) {
      const upcomingEvents = [...associatedClub.upcomingEvents, eventId];
      associatedClub.upcomingEvents = upcomingEvents;
      const updatedAssociatedClub = await clubRepo.updateByClubId(clubId, {
        ...associatedClub,
      });
    }

    const upComingEvents = associatedClub.upcomingEvents;
    const events = [];
    for (let i = 0; i < upComingEvents.length; i++) {
      const event = await eventRepo.findOne({ id: upComingEvents[i] });
      if (event) {
        events.push(getEventFromDBEvent(event));
      }
    }

    return res.status(200).send({
      message: "Event created successfully",
      events: events,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Request failed",
    });
  }
};

/**
 * Login.
 *
 * @param {Request} req
 * @param {Response} res
 */

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const event = await eventRepo.findOne({ id: id });
    if (!event) {
      return res.status(400).send({
        message: "No event exists with the provided id",
      });
    }
    return res.status(200).send({
      event: event,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "The event cannot be fetched",
    });
  }
};

/**
 * Login.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventRepo.findMany({}, {});
    return res.status(200).send({
      events: events,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Events cannot be fetched",
    });
  }
};

export const exportAllRegisteredUsers = async (req: Request, res: Response) => {
  // const users = req.body;
  // console.log("users are", users);
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registered Users");

    worksheet.columns = [
      { header: "S.No.", key: "sNo", width: 8 },
      { header: "Full Name", key: "name", width: 30 },
      { header: "Is MANIT Student?", key: "isManitStudent", width: 20 },
      { header: "Mobile Number", key: "phone", width: 20 },
      { header: "Email", key: "email", width: 40 },
    ];

    const users = req.body;
    const userData: registeredUsersResponse[] = [];
    let counter = 1;
    for (const userId of users) {
      const user = await userRepo.findOne({ id: userId });
      userData.push({
        sNo: counter,
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        isManitStudent:
          user?.isManitStudent ?? user?.isManitStudent === "False"
            ? "No"
            : "Yes",
        email: user?.email ?? "",
      });
      worksheet.addRow({
        sNo: counter,
        name: user?.name ?? "Amit",
        phone: user?.phone ?? "",
        isManitStudent: user?.isManitStudent ?? "false",
        email: user?.email ?? "",
      });

      counter++;
    }

    worksheet.getRow(1).eachCell((cell: any) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
      res.end();
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Server Error",
    });
  }
};

/**
 * Login.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const registerEvent = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.body;
    const event = await eventRepo.findOne({ id: eventId });
    const user = await userRepo.findOne({ id: userId });

    if (!user) {
      return res.status(400).send({
        message: "The user doesnot exit!",
      });
    }

    if (!event) {
      return res.status(400).send({
        message: "The event doesnot exit!",
      });
    }

    if (user) {
      const registeredEvents = [...user.eventsRegistered, eventId];
      user.eventsRegistered = registeredEvents;
      const updatedUser = await userRepo.updateByUserId(userId, {
        ...user,
      });
    }

    if (event) {
      event.registeredMembers = [...event.registeredMembers, userId];
      const updatedEvent = await eventRepo.updateByEventId(eventId, {
        ...event,
      });
    }

    const updatedUser = await userRepo.findOne({ id: userId });

    return res.status(200).send({
      message: "registered successfully to the event!",
      user: {
        id: updatedUser?.id ?? "",
        name: updatedUser?.name ?? "",
        email: updatedUser?.email ?? "",
        isManitStudent: updatedUser?.isManitStudent ?? false,
        phone: updatedUser?.phone ?? "",
        eventsRegistered: updatedUser?.eventsRegistered ?? [],
        scholarNumber: updatedUser?.scholarNumber ?? "",
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Events cannot be registered",
    });
  }
};
