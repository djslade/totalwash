import { NextFunction, Request, Response } from "express";
import { Category, Subcategory } from "../models";
import { body, validationResult } from "express-validator";
import { SubcategoryQuery, SubcategoryBody } from "../types";
import { validateArrayOfObjectIds } from "../utilities";

const getSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subcategoryId } = req.params;
    const subcategory = await Subcategory.findOne({ slug: subcategoryId })
      .populate("categories")
      .exec();
    return res.status(200).send({ subcategory });
  } catch (err) {
    return next(err);
  }
};

const getAllSubcategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.query;
    const query: SubcategoryQuery = {};
    if (category) {
      query.categories = category;
    }
    const subcategories = await Subcategory.find(query)
      .populate("categories")
      .exec();
    return res.status(200).send({ subcategories });
  } catch (err) {
    return next(err);
  }
};

const postSubcategory = [
  body("name").isString().notEmpty().trim(),
  body("description").isString().notEmpty().trim(),
  body("categories")
    .isArray()
    .custom((value) => validateArrayOfObjectIds(value)),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation error");
      }
      const { name, description, categories }: SubcategoryBody = req.body;
      categories.forEach(async (category) => {
        const categoryInDatabase = await Category.findById(category);
        if (!categoryInDatabase) {
          throw new Error("Specified category was not in database");
        }
      });
      const subcategory = new Subcategory({
        name,
        description,
        categories,
      });
      const savedSubcategory = await subcategory.save();
      return res.status(201).send({ subcategory: savedSubcategory });
    } catch (err) {
      return next(err);
    }
  },
];

const updateSubcategory = [
  body("name").isString().notEmpty().trim(),
  body("description").isString().notEmpty().trim(),
  body("categories")
    .isArray()
    .custom((value) => validateArrayOfObjectIds(value)),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Validation error");
      }
      const { name, description, categories }: SubcategoryBody = req.body;
      categories.forEach(async (category) => {
        const categoryInDatabase = await Category.findById(category);
        if (!categoryInDatabase) {
          throw new Error("Specified category was not in database");
        }
      });
      const { subcategoryId } = req.params;
      await Subcategory.findOneAndUpdate(
        {
          slug: subcategoryId,
        },
        {
          name,
          description,
          categories,
        }
      ).exec();
      return res.status(200).send({ message: "Subcategory was updated" });
    } catch (err) {
      return next(err);
    }
  },
];

const deleteSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subcategoryId } = req.params;
    await Subcategory.findOneAndDelete({ slug: subcategoryId });
    return res.status(200).send({ message: "Subcategory was deleted" });
  } catch (err) {
    return next(err);
  }
};

export const subcategoriesController = {
  getSubcategory,
  getAllSubcategories,
  postSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
