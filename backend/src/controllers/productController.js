const productService = require("../services/productService");

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
};