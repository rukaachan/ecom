import type { Prisma } from "@prisma/client";
import type { TFilter } from "@/hooks/use-filter";
import { getImageUrl } from "@/lib/image-utils";
import type { TProduct } from "@/type";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const response = (await request.json()) as TFilter;
    const QRQuery: Prisma.ProductWhereInput[] = [];

    if (response.search && response.search !== "") {
      QRQuery.push({
        name: {
          contains: response.search,
          mode: "insensitive",
        },
      });
    }

    if (response.maxPrice && response.maxPrice > 0) {
      QRQuery.push({
        price: {
          lte: response.maxPrice,
        },
      });
    }

    if (response.stock && response.stock.length > 0) {
      QRQuery.push({
        stock: {
          in: response.stock,
        },
      });
    }

    if (response.brands && response.brands.length > 0) {
      QRQuery.push({
        brand: {
          id: {
            in: response.brands,
          },
        },
      });
    }

    if (response.categories && response.categories.length > 0) {
      QRQuery.push({
        category: {
          id: {
            in: response.categories,
          },
        },
      });
    }

    if (response.locations && response.locations.length > 0) {
      QRQuery.push({
        location: {
          id: {
            in: response.locations,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: QRQuery.length > 0 ? QRQuery : undefined,
      },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        stock: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const res: TProduct[] = products.map((product) => ({
      id: product.id,
      image_url: getImageUrl(product.images[0], "product"),
      name: product.name,
      category_name: product.category.name,
      price: Number(product.price),
    }));

    return Response.json(res);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
