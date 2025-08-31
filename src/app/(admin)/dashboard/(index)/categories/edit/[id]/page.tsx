import { redirect } from "next/navigation";
import type { EditPageProp } from "@/type";
import FormCategory from "../../_components/form-category";
import { getCategoryById } from "../../lib/data";

export default async function CategoriesEditPage({ params }: EditPageProp) {
  const data = await getCategoryById((await params).id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return <FormCategory type="EDIT" data={data} />;
}
