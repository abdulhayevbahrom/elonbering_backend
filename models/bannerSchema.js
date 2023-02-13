const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bannerSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
});

const Banner = model("banner", bannerSchema);

const bannerValidate = (body) => {
  const schema = Joi.object({
    desc: Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.required(),
  });
  return schema.validate(body);
};
module.exports = { bannerValidate, Banner };


// desc
// title
// price
// images