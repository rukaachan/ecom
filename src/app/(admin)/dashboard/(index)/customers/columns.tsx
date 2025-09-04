import type { ColumnDef } from "@tanstack/react-table";

export type TColumn = {
  id: number;
  name: string;
  email: string;
  total_transaction: number;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "total_transaction",
    header: "Total Transaction",
  },
];
