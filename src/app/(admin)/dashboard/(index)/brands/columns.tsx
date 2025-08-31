"use client";

import type { Brand } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import FormDelete from "./_components/form-delete";

const BrandImage = ({ brand }: { brand: Brand }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = brand.logo ? getImageUrl(brand.logo, "brands") : null;

  // Show placeholder if no image or error occurred
  if (!imageUrl || imageError) {
    return (
      <div className="relative w-20 h-20">
        <Image
          key={`placeholder-${brand.id}`}
          src="/placeholder-image.png"
          alt={brand.name}
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
        key={`brand-${brand.id}`}
        src={imageUrl}
        alt={brand.name}
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

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brands",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <BrandImage brand={brand} />
          <span>{brand.name}</span>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/dashboard/brands/edit/${brand.id}`}>
            <Button size={"sm"} className="mr-2">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </Link>
          <FormDelete id={brand.id} />
        </div>
      );
    },
  },
];
