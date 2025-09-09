import prisma from "../../../../../../../lib/prisma";
import { getImageUrl } from "@/lib/local-storage";
import type { TColumn } from "../columns";

export async function getOrders() {
  try {
    const orders = await prisma?.order.findMany({
      include: {
        user: true,
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orders) {
      return [];
    }

    const response: TColumn[] = orders.map((ord) => {
      return {
        id: ord.id,
        customer_name: ord.user.name,
        price: Number(ord.total),
        products:
          ord.orderProducts?.map((item) => {
            return {
              name: item.product.name,
              image:
                item.product.images && item.product.images.length > 0
                  ? getImageUrl(item.product.images[0])
                  : "",
            };
          }) || [],
        status: ord.status,
      };
    });

    return response;
  } catch (_error) {
    console.error("Error fetching orders:", _error);
    return [];
  }
}
