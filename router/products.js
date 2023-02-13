const { Router } = require('express')
const router = Router()
const { Products, validateProduct } = require('../models/productSchema')
const cloudinary = require("../utils/cloudinary");
const uploads = require("../utils/multer");
const fs = require("fs");

//=========== GET PRODUCTS ==========
router.get('/', async (req, res) => {
    try {
        const allproducts = await Products.find()
        if (!allproducts.length) {
            return res.status(404).json({ state: false, msg: "Data is not defined", innerData: null })
        }
        res.status(200).json({ state: true, msg: "All products", innerData: allproducts })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: null })
    }
})
//=========== GET PRODUCTS  CATEGORY ==========
router.get('/:category', async (req, res) => {
    try {
        let { category } = req.params
        const allproducts = await Products.find({ category })
        if (!allproducts.length) {
            return res.status(404).json({ state: false, msg: "Data is not defined", innerData: null })
        }
        res.status(200).json({ state: true, msg: "All products", innerData: allproducts })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: null })
    }
})

//=========== CREATE PRODUCT ==========
router.post("/", uploads.array("images"), async (req, res) => {
    try {
        const uploader = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];
        if (req.files) {
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path);
            }
        }

        const { error, value } = validateProduct(req.body);
        if (error) {
            return res.json({
                state: false,
                msg: error.details[0].message,
                innerData: null,
            });
        }

        value.images = urls
        value.phoneNumber = "+998" + value.phoneNumber

        const createProduct = await Products.create(value)
        if (!createProduct) {
            return res.status(400).json({ state: false, msg: "Can not create", innerData: createProduct });
        }
        const saveProduct = await createProduct.save();
        res.status(200).json({
            state: true,
            msg: "Product was created",
            innerData: saveProduct
        });
    }
    catch {
        res.json({ state: false, msg: "Server error", innerData: null })
    }
})

//=========== DELETE PRODUCT ==========
router.delete("/:_id", async (req, res) => {
    try {
        let deleteProduct = await Products.findByIdAndDelete(req.params._id);
        res.json({ state: true, msg: "Deleted", innerData: deleteProduct });
    } catch {
        res.json({ state: false, msg: "Server error", innerData: null })
    }
});

//=========== UPDATE PRODUCT ==========
router.put("/:_id", async (req, res) => {
    try {
        const { value, error } = validateAdmin(req.body)
        if (error) {
            return res.status(400).json({ state: false, msg: error.details[0].message, innerData: null })
        }

        let updatedProduct = await Products.findByIdAndUpdate(req.params._id, value);
        res.json({ state: true, msg: "updated", innerData: updatedProduct });
    } catch {
        res.json("something went wrong");
    }
});

// ======== SEARCH =========
router.post("/search", async (req, res) => {
    try {
        const { productName } = req.body
        const allProducts = await Products.find().limit(10)
        const find = await allProducts.filter(i => i.title.toLowerCase().includes(productName.toLowerCase()))
        if (!find.length) {
            return res.json({ state: false, mag: "Malumotlat topilmadi", innerData: null })
        }
        res.status(200).json({ state: true, mag: "Topilgan ma'lumotlar", innerData: find })
    } catch (err) {
        res.status(500).json({ state: false, msg: "server error", innerData: null })
    }
})

// ======== SINGLE PAGE FOR PRODUCT =========
router.get("/single/:_id", async (req, res) => {
    try {
        let product = await Products.findById(req.params._id);
        if (!product) {
            return res.json({ state: false, msg: "Product with unique id found", innerData: null })
        }
        res.json({ state: true, msg: "Product with unique id found", innerData: product })
    }
    catch {
        res
            .status(500)
            .json({ state: false, msg: "Server error", innerData: null });
    }
})

// ======== VIEWS COUNT =========
router.patch("/view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updateProductOne = await Products.findById(id)
        const updateProduct = await Products.updateOne(
            {_id: id},
            {
              $set: {
                views: updateProductOne.views + 1 
              }
            }
          );
        res.json({ msg: 'This product is updated', data: updateProduct, state: true })
    }
    catch (err) {
        res.json(err)
    }
})

module.exports = router