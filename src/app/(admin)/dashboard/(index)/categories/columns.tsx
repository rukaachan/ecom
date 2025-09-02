"use client";

import type { Category } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/dashboard/categories/edit/${category.id}`}>
            <Button size={"sm"} className="mr-2">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </Link>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
