import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { getCustomers } from "./lib/data";

export default async function CustomersPage() {
  const data = await getCustomers();

  return (
    <main className="w-full px-4 py-5">
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Customers</h1>
            <p className="text-muted-foreground">Manage your customers</p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard/customers/create">
              <CirclePlus className="mr-2 h-4 w-4" />
              Add Customers
            </Link>
          </Button>
        </div>
      </section>
      <section className="overflow-hidden rounded-md border">
        <DataTable columns={columns} data={data} />
      </section>
    </main>
  );
}
