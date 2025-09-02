import { redirect } from "next/navigation";
import type { EditPageProp } from "@/type";
import FormProducts from "../../_components/form-products";
import { getProductById } from "../../lib/data";

export default async function ProductsEditPage({ params }: EditPageProp) {
  const id = (await params).id;
  const data = await getProductById(id);

  if (!data) {
    return redirect("/dashboard/products");
  }

  return <FormProducts type="EDIT" data={data} />;
}
