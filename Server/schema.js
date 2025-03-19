//const jsonschema = require('jsonschema');

const userSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 6 },
    "role": {
      "type": "string",
      "enum": ["admin", "user"]
    }
  },
  "required": ["name", "email", "password", "role"]
};

const productSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "categoryId": { "type": "integer" },
    "price": { "type": "number", "minimum": 0 },
    "stock": { "type": "integer", "minimum": 0 },
    "description": { "type": "string" },
    "isActive": { "type": "boolean" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "required": ["name", "categoryId", "price", "stock", "isActive", "createdAt"]
};

const categorySchema = {
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "description": { "type": "string" }
  },
  "required": ["name", "description"]
};

const variantSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "productId": { "type": "integer" },
    "name": { "type": "string" },
    "price": { "type": "number", "minimum": 0 },
    "stock": { "type": "integer", "minimum": 0 }
  },
  "required": ["productId", "name", "price", "stock"]
};

module.exports = {  userSchema,  productSchema,  categorySchema,  variantSchema};
