import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { getLocations } from "./lib/data";

export default async function LocationsPage() {
  const data = await getLocations();

  return (
    <div className="w-full px-4 py-5">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Locations</h1>
          <p className="text-muted-foreground">Manage your locations</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/locations/create">
            <CirclePlus className="mr-2 h-4 w-4" />
            Add Location
          </Link>
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
