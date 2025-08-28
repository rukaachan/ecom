"use client";

import type { Location } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location name",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const location = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <Link href={`/dashboard/locations/edit/${location.id}`}>
            <Button size={"sm"} className="mr-2">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </Link>
          <FormDelete id={location.id} />
        </div>
      );
    },
  },
];
