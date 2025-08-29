import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";
import { getCategoryById } from "../../lib/data";

interface EditPageProp {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProp) {
  const data = await getCategoryById((await params).id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return <FormCategory type="EDIT" data={data} />;
}
