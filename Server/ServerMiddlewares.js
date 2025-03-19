const jsonServer = require('json-server');
const { Validator } = require('jsonschema');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();

const { userSchema, productSchema, categorySchema, variantSchema } = require('./schema');

const validator = new Validator();

server.use(middlewares);

server.use((req, res, next) => {

  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    let schema;
    
    // Determine the schema based on the route
    if (req.url.includes('/users')) {
      schema = userSchema;
    } else if (req.url.includes('/products')) {
      schema = productSchema;
    } else if (req.url.includes('/categories')) {
      schema = categorySchema;
    } else if (req.url.includes('/variants')) {
      schema = variantSchema;
    }

    // Validate the data if schema exists for the route
    if (schema) {
      const validationResult = validator.validate(req.body, schema);

      if (!validationResult.valid) {
        // Respond with 400 and the validation errors
        return res.status(400).json({
          message: 'Invalid data',
          errors: validationResult.errors
        });
      }
    }
  }

  // If no validation issues, proceed to the next middleware
  next();
});

// Use the default router for handling API requests
server.use(router);

// Start the server
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
