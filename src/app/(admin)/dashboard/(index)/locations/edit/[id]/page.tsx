import { redirect } from "next/navigation";
import FormLocation from "../../_components/form-location";
import { getLocationById } from "../../lib/data";

interface EditPageProp {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProp) {
  const data = await getLocationById((await params).id);

  if (!data) {
    return redirect("/dashboard/locations");
  }

  return <FormLocation type="EDIT" data={data} />;
}
