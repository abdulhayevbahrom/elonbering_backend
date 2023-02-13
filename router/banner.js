const express = require("express");
const router = express.Router();
const { Banner, bannerValidate } = require("../models/bannerSchema");
const cloudinary = require("../utils/cloudinary");
const uploads = require("../utils/multer");
const fs = require("fs");
const { resolveSoa } = require("dns");

// Read Banner
router.get("/",  async (req, res) => {
  try {
    const banner = await Banner.find();

    if (!banner.length) {
      return res
        .status(404)
        .json({ state: false, msg: "Data is not defined", innerData: null });
    }

    res
      .status(200)
      .json({ state: true, msg: "All banners", innerData: banner });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "Server error", innerData: null });
  }
});

// Create Banner
router.post("/",  uploads.single("images"), async (req, res) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "photos");
    let imageLink = '';
    if (req.file) {
      const files = req.file;
        const { path } = files;
        const newPath = await uploader(path);
        imageLink = newPath;
        fs.unlinkSync(path);
      }

      if(imageLink !==""){
        let {desc, price, title, images}= req.body
        let obj = {desc, title, price, images:imageLink}
        res.send(obj)
      }
      else{
        res.send('no')
      }
    // const {value, error} = bannerValidate(obj)
    // if (error) {
        // return res.status(400).json({state: false, msg: error.details[0].message, innerData: null });
    // }
    
    // res.send(value)

    //  const newBanner = await Banner.create(value)
    // if (!newBanner) {
    //     return res.status(400).json({ state: false, msg: "can not create", innerData: null });
    // }

    // const savedBanner = await newBanner.save();

    // if (!savedBanner) {
    //     return res.status(400).json({ state: false, msg: "can not saved", innerData: null });
    // }
    
    // res.status(201).json({ state: true, msg: "successfully created", data: savedBanner,});

  } catch {
    res
      .status(500)
      .json({ state: false, msg: "Server error", innerData: null });
  }
});
module.exports = router;
