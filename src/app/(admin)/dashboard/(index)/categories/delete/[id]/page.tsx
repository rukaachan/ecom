import { SquareChevronLeft, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteCategory } from "@/app/(admin)/dashboard/(index)/categories/lib/actions";
import { getCategoryById } from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import { Button } from "@/components/ui/button";

interface DeletePageProps {
  params: Promise<{ id: string }>;
}

export default async function DeletePage({ params }: DeletePageProps) {
  const data = await getCategoryById((await params).id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return (
    <div className="flex justify-center w-full my-5">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-5">
          <Link href="/dashboard/categories" className="flex items-center w-fit">
            <SquareChevronLeft className="mr-2" />
            <span className="text-2xl font-bold mb-1">Back</span>
          </Link>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Trash className="h-12 w-12 text-red-500" />
            <h2 className="text-2xl font-bold">Delete Category</h2>
            <p className="text-muted-foreground text-center">
              Are you sure you want to delete the category <strong>{data.name}</strong>? This action
              cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
              <Button asChild variant="outline">
                <Link href="/dashboard/categories">Cancel</Link>
              </Button>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={data.id} />
                <Button type="submit" variant="destructive">
                  Delete Category
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
