import { EventModel, EventOptional } from "./event.schema";
import { Event } from "@/types/dto/event.dto";

const create = async (data: Event) => {
  const newEvent = new EventModel({
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });

  await newEvent.save();

  return newEvent;
};

const findOne = async (data: EventOptional) => {
  return await EventModel.findOne({ ...data });
};

const findOneById = async (id: string) => {
  return await EventModel.findById(id);
};

const update = async (id: string, data: Event) => {
  await EventModel.findByIdAndUpdate(id, {
    ...data,
  });
};


const updateByEventId = async (eventId: string, data: Event) => {
  await EventModel.findOneAndUpdate({ id: eventId }, data, {
    new: true,
  });
};


const findMany = async (
  filter: any,
  projection: any
): Promise<Array<Event>> => {
  try {
    const events = await EventModel.find({ ...filter }, { ...projection });

    return events.map((e) => {
      return {
        ...e.toObject(),
        id: e.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

export default {
  create,
  findOne,
  update,
  findMany,
  findOneById,
  updateByEventId,
};
