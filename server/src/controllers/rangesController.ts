import { NextFunction, Request, Response } from "express";
import { Range } from "../models";
import { body, validationResult } from "express-validator";
import { validateArrayOfObjectIds } from "../utilities";

const getRange = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rangeId } = req.params;
    const range = await Range.findOne({ slug: rangeId })
      .populate("parents")
      .exec();
    return res.status(200).send({ range });
  } catch (err) {
    return next(err);
  }
};

const getAllRanges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { parent } = req.query;
    const query: { parents?: string } = {};
    if (parent) {
      query.parents = parent as string;
    }
    const ranges = await Range.find(query).populate("parents").exec();
    return res.status(200).send({ ranges });
  } catch (err) {
    return next(err);
  }
};

const postRange = [
  body("name").isString().notEmpty().trim(),
  body("description").isString().notEmpty().trim(),
  body("parents")
    .isArray()
    .custom((value) => validateArrayOfObjectIds(value)),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation error");
      }
      const {
        name,
        description,
        parents,
      }: { name: string; description: string; parents: string[] } = req.body;
      parents.forEach(async (parent) => {
        const parentInDatabase = await Range.findById(parent);
        if (!parentInDatabase) {
          throw new Error("Specified category was not in database");
        }
      });
      const range = new Range({
        name,
        description,
        parents,
      });
      const newRange = await range.save();
      return res.status(201).send({ range: newRange });
    } catch (err) {
      return next(err);
    }
  },
];

const updateRange = [
  body("name").isString().notEmpty().trim(),
  body("description").isString().notEmpty().trim(),
  body("parents")
    .isArray()
    .custom((value) => validateArrayOfObjectIds(value)),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation error");
      }
      const {
        name,
        description,
        parents,
      }: { name: string; description: string; parents: string[] } = req.body;
      parents.forEach(async (parent) => {
        const parentInDatabase = await Range.findById(parent);
        if (!parentInDatabase) {
          throw new Error("Specified category was not in database");
        }
      });
      const { rangeId } = req.params;
      const range = await Range.findOneAndUpdate(
        {
          slug: rangeId,
        },
        {
          name,
          description,
          parents,
        },
        {
          new: true,
        }
      ).exec();
      return res.status(200).send({ range });
    } catch (err) {
      return next(err);
    }
  },
];

const deleteRange = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { RangeId } = req.params;
    await Range.findOneAndDelete({ slug: RangeId });
    return res.status(200).send({ message: "Range was deleted" });
  } catch (err) {
    return next(err);
  }
};

export const rangesController = {
  getRange,
  getAllRanges,
  postRange,
  updateRange,
  deleteRange,
};
