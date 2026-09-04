const prisma = require("../config/db");

const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      variants: {
        include: {
          emiPlans: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

const getProductBySlug = async (slug) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        include: {
          emiPlans: true,
        },
      },
    },
  });
};

module.exports = {
  getAllProducts,
  getProductBySlug,
};