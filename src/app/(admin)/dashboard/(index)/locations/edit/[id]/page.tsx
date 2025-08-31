import { redirect } from "next/navigation";
import type { EditPageProp } from "@/type";
import FormLocation from "../../_components/form-location";
import { getLocationById } from "../../lib/data";

export default async function LocationsEditPage({ params }: EditPageProp) {
  const data = await getLocationById((await params).id);

  if (!data) {
    return redirect("/dashboard/locations");
  }

  return <FormLocation type="EDIT" data={data} />;
}
