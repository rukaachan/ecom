"use server";

import prisma from "../../../../../../../lib/prisma";
import type { TColumn } from "../columns";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const response: TColumn[] = customers.map((cust) => {
      return {
        id: cust.id,
        name: cust.name,
        email: cust.email,
        total_transaction: cust._count.orders,
      };
    });

    return response;
  } catch (_error) {}
}
