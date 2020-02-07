const Ajv = require("ajv");
const ajv = new Ajv();

const validate = (schema, data) => {
  const isValid = ajv.validate(schema, data);
  if (!isValid) return { error: true, params: ajv.errors };
  return { error: false, params: ajv.errors };
};

module.exports = { validate };
