const express = require("express");
const Product = require("../models/Product");

const product = express.Router();

product.post("/baza", async (req, res) => {
  try {
    const file = await Product.create({
      img:req.body.img,
      name: req.body.name,
      year:req.body.year,
      type: req.body.type,
      color: req.body.color,
      price: req.body.price,
      manzil: req.body.manzil,
      phoneNumber: req.body.phoneNumber,
      maydoni: req.body.maydoni
    });
    const newFile = await file.save();
    res.json(newFile);
  } catch (err) {
    res.send("Something went wrong");
  }
});

product.get("/baza/allProduct", async (req, res) => {
  const product = await Product.find();
  try {
    res.json(product);
  } catch (err) {
    res.send("No results!");
  }
});


product.get("/baza/avtomobile", async (req, res) => {
  const allFiles = await Product.find({ type: "avtomobile" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/uyjoy", async (req, res) => {
  const allFiles = await Product.find({ type: "uyjoy" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/mobile", async (req, res) => {
  const allFiles = await Product.find({ type: "mobile" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/maishiy", async (req, res) => {
  const allFiles = await Product.find({ type: "maishiy" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/xizmat", async (req, res) => {
  const allFiles = await Product.find({ type: "xizmat" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/oziqovqat", async (req, res) => {
  const allFiles = await Product.find({ type: "oziqovqat" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.get("/baza/mebel", async (req, res) => {
  const allFiles = await Product.find({ type: "mebel" });
  try {
    res.json(allFiles);
  } catch (err) {
    res.send("No results!");
  }
});

product.delete("/baza/:id", async (req, res) => {
  const DeleteItem = await Product.findByIdAndDelete({_id:req.params.id});
  try {
    res.json("Ma'lumot o'chirildi! ✔✔");
  } catch (err) {
    res.send("Ma'lumot o'chirilmadi❌");
  }
});


module.exports = product;


