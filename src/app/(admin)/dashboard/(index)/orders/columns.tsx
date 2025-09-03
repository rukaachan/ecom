"use client";

import type { OrderStatus } from "@prisma/client";
import Image from "next/image";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  products: TProduct[];
  customer_name: string;
  price: number;
  status: OrderStatus;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-col justify-start">
          {order.products.map((item) => (
            <div key={item.name} className="inline-flex items-center gap-5">
              <div className="relative w-10 h-10">
                <Image
                  src={item.image || "/placeholder-image.png"}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="40px"
                  unoptimized={true}
                />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      const order = row.original;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(order.price);
    },
  },
  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === "cancelled" ? "destructive" : "default"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];
