import { PrismaClient, ProductStatus, OrderStatus, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'password123',
      role: Role.superadmin,
    },
  })

  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'John Customer',
      email: 'customer@example.com',
      password: 'password123',
      role: Role.customer,
    },
  })

  const [nike, adidas, puma] = await Promise.all([
    prisma.brand.create({
      data: { name: 'Nike', logo: '/brands/nike.png' },
    }),
    prisma.brand.create({
      data: { name: 'Adidas', logo: '/brands/adidas.png' },
    }),
    prisma.brand.create({
      data: { name: 'Puma', logo: '/brands/puma.png' },
    }),
  ])

  const [shoes, clothing, accessories] = await Promise.all([
    prisma.category.create({ data: { name: 'Shoes' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
    prisma.category.create({ data: { name: 'Accessories' } }),
  ])

  const [warehouse, jakarta, bandung] = await Promise.all([
    prisma.location.create({ data: { name: 'Main Warehouse' } }),
    prisma.location.create({ data: { name: 'Jakarta Store' } }),
    prisma.location.create({ data: { name: 'Bandung Store' } }),
  ])

  const product1 = await prisma.product.create({
    data: {
      brand_id: nike.id,
      category_id: shoes.id,
      location_id: warehouse.id,
      name: 'Nike Air Zoom Pegasus',
      description: 'Lightweight running shoes for daily training.',
      price: BigInt(1200000),
      stock: ProductStatus.available,
      images: ['/products/pegasus-1.png'],
    },
  })

  const product2 = await prisma.product.create({
    data: {
      brand_id: adidas.id,
      category_id: clothing.id,
      location_id: jakarta.id,
      name: 'Adidas Training T-Shirt',
      description: 'Breathable t-shirt for workouts.',
      price: BigInt(350000),
      stock: ProductStatus.available,
      images: ['/products/adidas-tee.png'],
    },
  })

  const order = await prisma.order.create({
    data: {
      code: 'ORD-0001',
      user_id: customer.id,
      total: BigInt(1550000),
      status: OrderStatus.pending,
      product_id: product1.id,
      orderDetail: {
        create: {
          name: 'John Customer',
          phone: '081234567890',
          address: 'Jl. Example No. 123',
          city: 'Jakarta',
          postal_code: '12345',
          notes: 'Leave at the front door.',
        },
      },
      orderProducts: {
        create: [
          {
            product: { connect: { id: product1.id } },
          },
          {
            product: { connect: { id: product2.id } },
          },
        ],
      },
    },
    include: {
      orderDetail: true,
      orderProducts: true,
    },
  })

  console.log({ superadmin, customer, brands: [nike, adidas, puma], categories: [shoes, clothing, accessories], locations: [warehouse, jakarta, bandung], products: [product1, product2], order })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
