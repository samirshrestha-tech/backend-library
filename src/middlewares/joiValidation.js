import Joi from "joi";

export const newUserValidation = (req, res, next) => {
  try {
    // model what the validation is

    const schema = Joi.object({
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().allow("", null),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    // model what the validation is

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),

      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
