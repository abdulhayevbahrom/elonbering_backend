const { Schema, model } = require('mongoose')
const Joi = require("joi");

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
    },
    probeg: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    materialType: {
        type: String
    },
    desc: {
        type: String
    },
    views: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: new Date()
    }
})

const Products = model("products", productSchema)

const validateProduct = (body) => {
    const schema = Joi.object({
        category: Joi.string().required(),
        title: Joi.string().required(),
        price: Joi.number().required(),
        location: Joi.string(),
        materialType: Joi.string(),
        images: Joi.array(),
        color: Joi.string(),
        probeg: Joi.number(),
        phoneNumber: Joi.number().required(),
        desc: Joi.string(),
        views: Joi.number().required(),
        date: Joi.string()
    });
    return schema.validate(body);
};

module.exports = { Products, validateProduct }