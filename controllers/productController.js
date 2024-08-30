const Products = require("../models/Products")



const getAllProducts = async (req, res) =>{
const products =await Products.find()
res.status(200).json(products)
}

module.exports = {getAllProducts}