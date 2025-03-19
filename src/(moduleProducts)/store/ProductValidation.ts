// src/utils/validation.ts
import Joi from "joi";


export const ProductValidationSchemaFrom1 = Joi.object({
  // id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(255).required(),
  categoryId: Joi.string().required(),
  // price: Joi.number().positive().required(),
  // stock: Joi.number().integer().min(0).required(),
  // description: Joi.string().allow("").optional(),
  // isActive: Joi.boolean().required(),
  // createdAt: Joi.string().isoDate().required(),
});
export const ProductValidationSchemaFrom2 = Joi.object({
  description: Joi.string().min(3).required(),
  notes: Joi.string().optional()
});
export const VariantValidationSchemaFrom1 = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().min(1).max(255).required(),

});
export const VariantValidationSchemaFrom2 = Joi.object({
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});


export const CategoryValidationSchemaFrom1 = Joi.object({
  name: Joi.string().min(1).max(255).required(),
});
export const CategoryValidationSchemaFrom2 = Joi.object({
  description: Joi.string().allow("").optional(),
});