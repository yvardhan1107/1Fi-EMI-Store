const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Helper to calculate monthly EMI using standard reducing balance formula
function calculateEMI(principal, annualRate, months) {
  if (annualRate === 0) {
    return Math.ceil(principal / months);
  }

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(emi);
}

async function main() {
  console.log("Seeding database...");

  // Reset database tables
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  // 1. iPhone 17 Pro
  await prisma.product.create({
    data: {
      name: "iPhone 17 Pro",
      slug: "iphone-17-pro",
      description:
        "Apple iPhone 17 Pro with Titanium design, Pro camera system, and flexible mutual fund backed EMI plans.",

      variants: {
        create: [
          {
            storage: "256GB",
            color: "Cosmic Orange",
            imageUrl: "/images/iphone-17-pro-orange.png",
            mrp: 134900,
            price: 127400,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(127400, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 7500,
                },
                {
                  monthlyPayment: calculateEMI(127400, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 7500,
                },
                {
                  monthlyPayment: calculateEMI(127400, 0, 12),
                  tenureMonths: 12,
                  interestRate: 0,
                  cashback: 7500,
                },
                {
                  monthlyPayment: calculateEMI(127400, 10.5, 24),
                  tenureMonths: 24,
                  interestRate: 10.5,
                  cashback: 5000,
                },
              ],
            },
          },

          {
            storage: "256GB",
            color: "White Silver",
            imageUrl: "/images/iphone-17-pro-white.png",
            mrp: 134900,
            price: 127400,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(127400, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 7500,
                },
                {
                  monthlyPayment: calculateEMI(127400, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 7500,
                },
                {
                  monthlyPayment: calculateEMI(127400, 0, 12),
                  tenureMonths: 12,
                  interestRate: 0,
                  cashback: 7500,
                },
              ],
            },
          },

          {
            storage: "512GB",
            color: "Deep Blue",
            imageUrl: "/images/iphone-17-pro-deepblue.png",
            mrp: 154900,
            price: 147400,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(147400, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 8000,
                },
                {
                  monthlyPayment: calculateEMI(147400, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 8000,
                },
                {
                  monthlyPayment: calculateEMI(147400, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 6000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S25 Ultra
  await prisma.product.create({
    data: {
      name: "Samsung Galaxy S25 Ultra",
      slug: "samsung-s25-ultra",
      description:
        "Samsung Galaxy S25 Ultra with Snapdragon 8 Elite, 200MP camera system, built-in S Pen, and instant EMI financing.",

      variants: {
        create: [
          {
            storage: "256GB",
            color: "Titanium Black",
            imageUrl: "/images/samsung-s25-ultra-black.png",
            mrp: 129999,
            price: 119999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(119999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 5000,
                },
                {
                  monthlyPayment: calculateEMI(119999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 5000,
                },
                {
                  monthlyPayment: calculateEMI(119999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 4000,
                },
              ],
            },
          },

          {
            storage: "256GB",
            color: "Titanium Gray",
            imageUrl: "/images/samsung-s25-ultra-gray.png",
            mrp: 129999,
            price: 119999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(119999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 5000,
                },
                {
                  monthlyPayment: calculateEMI(119999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 5000,
                },
                {
                  monthlyPayment: calculateEMI(119999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 4000,
                },
              ],
            },
          },

          {
            storage: "512GB",
            color: "Titanium Silverblue",
            imageUrl: "/images/samsung-s25-ultra-silverblue.png",
            mrp: 149999,
            price: 139999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(139999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 6000,
                },
                {
                  monthlyPayment: calculateEMI(139999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 6000,
                },
                {
                  monthlyPayment: calculateEMI(139999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 5000,
                },
              ],
            },
          },

          {
            storage: "512GB",
            color: "Titanium Whitesilver",
            imageUrl: "/images/samsung-s25-ultra-whitesilver.png",
            mrp: 149999,
            price: 139999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(139999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 6000,
                },
                {
                  monthlyPayment: calculateEMI(139999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 6000,
                },
                {
                  monthlyPayment: calculateEMI(139999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 5000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 3. OnePlus Nord 6
  await prisma.product.create({
    data: {
      name: "OnePlus Nord 6",
      slug: "oneplus-nord-6",
      description:
        "OnePlus Nord 6 with Dimensity 9300 processor, 100W fast charging, 165 FPS gaming display, and low monthly EMI options.",

      variants: {
        create: [
          {
            storage: "256GB",
            color: "Mint Green",
            imageUrl: "/images/oneplus-nord-6-mint.png",
            mrp: 39999,
            price: 34999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(34999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 2000,
                },
                {
                  monthlyPayment: calculateEMI(34999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 2000,
                },
                {
                  monthlyPayment: calculateEMI(34999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 1500,
                },
              ],
            },
          },

          {
            storage: "256GB",
            color: "Pitch Black",
            imageUrl: "/images/oneplus-nord-6-black.png",
            mrp: 39999,
            price: 34999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(34999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 2000,
                },
                {
                  monthlyPayment: calculateEMI(34999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 2000,
                },
              ],
            },
          },

          {
            storage: "512GB",
            color: "Quick Silver",
            imageUrl: "/images/oneplus-nord-6-silver.png",
            mrp: 44999,
            price: 39999,

            emiPlans: {
              create: [
                {
                  monthlyPayment: calculateEMI(39999, 0, 3),
                  tenureMonths: 3,
                  interestRate: 0,
                  cashback: 2500,
                },
                {
                  monthlyPayment: calculateEMI(39999, 0, 6),
                  tenureMonths: 6,
                  interestRate: 0,
                  cashback: 2500,
                },
                {
                  monthlyPayment: calculateEMI(39999, 10.5, 12),
                  tenureMonths: 12,
                  interestRate: 10.5,
                  cashback: 2000,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });