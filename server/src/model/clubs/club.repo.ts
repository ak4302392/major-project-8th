import { Club } from "@/types/dto/club.dto";
import { ClubModel, ClubOptional } from "./club.schema";

const create = async (data: Club) => {
  const newClub = new ClubModel({
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });

  await newClub.save();

  return newClub;
};

const findOne = async (data: ClubOptional) => {
  return await ClubModel.findOne({ ...data });
};

const findOneById = async (id: string) => {
  return await ClubModel.findById(id);
};

const update = async (id: string, data: Club) => {
  await ClubModel.findByIdAndUpdate(id, {
    ...data,
  });
};

const findMany = async (
  filter: any,
  projection: any
): Promise<Array<Event>> => {
  try {
    const events = await ClubModel.find({ ...filter }, { ...projection });

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
};
