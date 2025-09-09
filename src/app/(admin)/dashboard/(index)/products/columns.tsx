"use client";

import type { ProductStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/local-storage";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import FormDelete from "./_components/form-delete";

export type TColumn = {
  id?: number;
  name?: string;
  images?: string[];
  category_name: string;
  brand_name: string;
  price?: number;
  total_sales?: number;
  stock?: ProductStatus;
  createdAt?: Date;
};

const ProductImage = ({ product }: { product: TColumn }) => {
  const [imageError, setImageError] = useState(false);
  // Use the first image from the array, or null if no images
  const imageUrl =
    product.images && product.images.length > 0 ? getImageUrl(product.images[0], "product") : null;

  // Show placeholder if no image or error occurred
  if (!imageUrl || imageError) {
    return (
      <div className="relative w-20 h-20">
        <Image
          key={`placeholder-${product.id}`}
          src="/placeholder-image.png"
          alt={product.name || "Product"}
          fill
          className="object-cover rounded"
          sizes="80px"
          unoptimized={true}
        />
      </div>
    );
  }

  // Show actual image
  return (
    <div className="relative w-20 h-20">
      <Image
        key={`product-${product.id}`}
        src={imageUrl}
        alt={product.name || "Product"}
        fill
        className="object-cover rounded"
        sizes="80px"
        onError={() => {
          setImageError(true);
        }}
        unoptimized={true}
      />
    </div>
  );
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <ProductImage product={product} />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;

      return rupiahFormat(BigInt(product.price ?? 0));
    },
  },
  {
    accessorKey: "stock",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;

      return <Badge variant={"outline"}>{product.stock}</Badge>;
    },
  },
  {
    accessorKey: "total_sales",
    header: "Total Sales",
    cell: ({ row }) => {
      const product = row.original;
      // Default to 0 if total_sales is not defined
      return product.total_sales ?? 0;
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const product = row.original;

      return dateFormat(product.createdAt ?? null);
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          {product.id && (
            <>
              <Link href={`/dashboard/products/edit/${product.id}`}>
                <Button size={"sm"} className="mr-2">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <FormDelete id={product.id} />
            </>
          )}
        </div>
      );
    },
  },
];
