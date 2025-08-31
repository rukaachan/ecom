import { redirect } from "next/navigation";
import type { EditPageProp } from "@/type";
import FormBrands from "../../_components/form-brands";
import { getBrandById } from "../../lib/actions";

export default async function BrandsEditPage({ params }: EditPageProp) {
  const data = await getBrandById((await params).id);

  if (!data) {
    return redirect("/dashboard/brands");
  }

  return <FormBrands type="EDIT" data={data} />;
}
