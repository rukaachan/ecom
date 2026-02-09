import { existsSync } from "fs";
import { join } from "path";
import bcryptjs from "bcryptjs";
import { OrderStatus, PrismaClient, ProductStatus, Role } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_SUPERADMIN_EMAIL = "superadmin@example.com";
const SEED_CUSTOMER_EMAIL = "customer@example.com";

const BRAND_SEEDS = [
  { name: "Apple", logo: "/assets/logos/apple.svg" },
  { name: "Samsung", logo: "/assets/logos/samsung.svg" },
  { name: "Huawei", logo: "/assets/logos/huawei.svg" },
  { name: "Microsoft", logo: "/assets/logos/microsoft.svg" },
  { name: "Nokia", logo: "/assets/logos/nokia.svg" },
] as const;

const CATEGORY_SEEDS = ["Smartphones", "Wearables", "Computers"] as const;
const LOCATION_SEEDS = ["Main Warehouse", "Jakarta Store", "Bandung Store"] as const;

const PRODUCT_SEEDS = [
  {
    name: "Galaxy Fit Pro",
    description: "Lightweight wearable with all-day activity tracking.",
    price: BigInt(899000),
    image: "/assets/thumbnails/246c3a1bf608fed816e2e038784fa995.png",
  },
  {
    name: "AirPods Max Sky Blue",
    description: "Premium over-ear headphones with high-fidelity audio.",
    price: BigInt(7999000),
    image: "/assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom-1.png",
  },
  {
    name: "iPhone Green Edition",
    description: "Powerful smartphone with advanced camera capabilities.",
    price: BigInt(15999000),
    image: "/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom-1.png",
  },
  {
    name: "Smart Home Hub",
    description: "Central smart-home controller with voice assistance support.",
    price: BigInt(1299000),
    image: "/assets/thumbnails/ea49dfcfcaa4513d799050c989d2f177.png",
  },
  {
    name: "iMac 24",
    description: "All-in-one desktop with vivid display and fast performance.",
    price: BigInt(22999000),
    image: "/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom-1.png",
  },
  {
    name: "iPhone 15 Pro",
    description: "Flagship smartphone with pro-level camera and performance.",
    price: BigInt(18999000),
    image: "/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom-1.png",
  },
] as const;

const assertAssetsExist = (assetPaths: readonly string[]) => {
  const missingAssets = assetPaths.filter((assetPath) => {
    const absolutePath = join(process.cwd(), "public", assetPath.replace(/^\//, ""));
    return !existsSync(absolutePath);
  });

  if (missingAssets.length > 0) {
    throw new Error(`Seed aborted: missing referenced asset file(s): ${missingAssets.join(", ")}`);
  }
};

async function resetSeedData() {
  await prisma.orderProduct.deleteMany();
  await prisma.orderDetail.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.location.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany({
    where: {
      email: {
        notIn: [SEED_SUPERADMIN_EMAIL, SEED_CUSTOMER_EMAIL],
      },
    },
  });
}

async function main() {
  assertAssetsExist([
    ...BRAND_SEEDS.map((brand) => brand.logo),
    ...PRODUCT_SEEDS.map((product) => product.image),
  ]);

  await resetSeedData();

  const hashedPassword = bcryptjs.hashSync("password123", 12);
  const [superadmin, customer] = await Promise.all([
    prisma.user.upsert({
      where: { email: SEED_SUPERADMIN_EMAIL },
      update: {
        name: "Super Admin",
        password: hashedPassword,
        role: Role.superadmin,
      },
      create: {
        name: "Super Admin",
        email: SEED_SUPERADMIN_EMAIL,
        password: hashedPassword,
        role: Role.superadmin,
      },
    }),
    prisma.user.upsert({
      where: { email: SEED_CUSTOMER_EMAIL },
      update: {
        name: "John Customer",
        password: hashedPassword,
        role: Role.customer,
      },
      create: {
        name: "John Customer",
        email: SEED_CUSTOMER_EMAIL,
        password: hashedPassword,
        role: Role.customer,
      },
    }),
  ]);

  await prisma.brand.createMany({
    data: BRAND_SEEDS.map((brand) => ({
      name: brand.name,
      logo: brand.logo,
    })),
  });

  await prisma.category.createMany({
    data: CATEGORY_SEEDS.map((category) => ({ name: category })),
  });

  await prisma.location.createMany({
    data: LOCATION_SEEDS.map((location) => ({ name: location })),
  });

  const [brands, categories, locations] = await Promise.all([
    prisma.brand.findMany({ orderBy: { id: "asc" } }),
    prisma.category.findMany({ orderBy: { id: "asc" } }),
    prisma.location.findMany({ orderBy: { id: "asc" } }),
  ]);

  const products = await Promise.all(
    PRODUCT_SEEDS.map((product, index) =>
      prisma.product.create({
        data: {
          brand_id: brands[index % brands.length].id,
          category_id: categories[index % categories.length].id,
          location_id: locations[index % locations.length].id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: ProductStatus.available,
          images: [product.image],
        },
      })
    )
  );

  const order = await prisma.order.create({
    data: {
      code: "ORD-0001",
      user_id: customer.id,
      total: products[0].price + products[1].price,
      status: OrderStatus.pending,
      product_id: products[0].id,
      orderDetail: {
        create: {
          name: "John Customer",
          phone: "081234567890",
          address: "Jl. Example No. 123",
          city: "Jakarta",
          postal_code: "12345",
          notes: "Leave at the front door.",
        },
      },
      orderProducts: {
        create: [
          { product: { connect: { id: products[0].id } } },
          { product: { connect: { id: products[1].id } } },
        ],
      },
    },
    include: {
      orderDetail: true,
      orderProducts: true,
    },
  });

  console.log({
    superadmin,
    customer,
    brandsCount: brands.length,
    categoriesCount: categories.length,
    locationsCount: locations.length,
    productsCount: products.length,
    orderCode: order.code,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
