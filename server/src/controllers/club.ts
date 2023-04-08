import { Request, Response } from "express";
import { createJWT } from "@/utils/jwt";
import clubRepo from "@/model/clubs/club.repo";
import { ClubDocument } from "@/model/clubs/club.schema";
import eventRepo from "@/model/events/event.repo";
import { EventDocument } from "@/model/events/event.schema";

const bcrypt = require("bcrypt");

/**
 * Create user
 *
 * @param {Request} req
 * @param {Response} res
 */
export const createClub = async (req: Request, res: Response) => {
  try {
    const {
      clubId,
      name,
      desc,
      images,
      industryType,
      accounts,
      upcomingEvents,
      cordinatorName,
      memories,
    } = req.body;

    const orgPassword = accounts?.orgAccount?.password ?? "12345";
    const cordPassword = accounts?.cordinatorAccount?.password ?? "12345";

    if (!clubId) {
      return res.status(400).send({
        message: "ClubId is required",
      });
    }

    if (!name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }

    if (!images) {
      return res.status(400).send({
        message: "Images are required",
      });
    }

    if (!desc) {
      return res.status(400).send({
        message: "Description is required",
      });
    }

    if (!industryType) {
      return res.status(400).send({
        message: "Industry Type is required",
      });
    }

    if (!accounts) {
      return res.status(400).send({
        message: "Accounts are required",
      });
    }

    if (!cordinatorName) {
      return res.status(400).send({
        message: "Cordinator name is required",
      });
    }

    const club = await clubRepo.findOne({ clubId: clubId });

    if (club) {
      return res.status(400).send({
        message: "Club exists",
      });
    }
    const hashedCordPassword = await bcrypt.hash(cordPassword, 10);

    const hashedOrgPassword = await bcrypt.hash(orgPassword, 10);

    const newUser = await clubRepo.create({
      clubId: clubId,
      name: name,
      desc: desc,
      images: images,
      industryType: industryType,
      upcomingEvents: upcomingEvents,
      accounts: {
        orgAccount: {
          id: accounts.orgAccount.id,
          password: hashedOrgPassword,
        },
        corAccount: {
          id: accounts.corAccount.id,
          password: hashedCordPassword,
        },
      },
      cordinatorName: cordinatorName,
      memories: memories,
    });

    return res.status(200).send({
      message: "Club created!",
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
export const ClubLogin = async (req: Request, res: Response) => {
  try {
    const { clubId, email, password } = req.body;

    if (!clubId) {
      return res.status(400).send({
        message: "Club Id is required",
      });
    }

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password is required",
      });
    }
    const club = await clubRepo.findOne({ clubId: clubId });
    if (!club) {
      return res.status(400).send({
        message: "Club not present",
      });
    }

    const clubEmail = club.accounts.orgAccount.id;
    if (email.toLowerCase().trim() != clubEmail) {
      return res.status(400).send({
        message: "Invalid club account id",
      });
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      club.accounts.orgAccount.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }
    const upComingEvents = club.upcomingEvents;
    const events = [];
    for (let i = 0; i < upComingEvents.length; i++) {
      const event = await eventRepo.findOne({ id: upComingEvents[i] });
      if (event) {
        events.push(getEventFromDBEvent(event));
      }
    }
    console.log("the events are", events);

    return res.status(200).send({
      message: "Club Login sucessfull!",
      token: getTokenFromDBClub(club),
      club: getWebUserFromDBClub(club),
      events: events,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Request failed",
    });
  }
};

export const getClubById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const club = await clubRepo.findOne({ clubId: id });
    if (!club) {
      return res.status(400).send({
        message: "No club exists with the provided id",
      });
    }
    console.log("the club is", club.name);
    return res.status(200).send({
      club: getClubFromDBClub(club),
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "The club cannot be fetched",
    });
  }
};

const getWebUserFromDBClub = (club: ClubDocument) => {
  return {
    clubId: club.clubId,
    name: club.name,
    desc: club.desc,
    images: club.images,
    industryType: club.industryType,
    upcomingEvents: club.upcomingEvents,
    cordinatorName: club.cordinatorName,
    memories: club.memories,
  };
};

export const getEventFromDBEvent = (event: EventDocument) => {
  return {
    id: event.id,
    name: event.name,
    desc: event.desc,
    clubName: event.clubName,
    clubId: event.clubId,
    eventDate: event.eventDate,
    registeredMembers: event.registeredMembers,
    images: event.images,
    category: event.category,
  };
};

export const getClubFromDBClub = (club: ClubDocument) => {
  return {
    clubId: club.clubId,
    name: club.name,
    desc: club.desc,
    images: club.images,
    industryType: club.industryType,
    upcomingEvents: club.upcomingEvents,
    cordinatorName: club.cordinatorName,
    memories: club.memories,
  };
};

const getTokenFromDBClub = (club: ClubDocument) => {
  return createJWT({
    email: club.accounts.orgAccount.id,
    name: club.name,
    id: club.id,
  });
};
