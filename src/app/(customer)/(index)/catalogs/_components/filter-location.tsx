import { getLocations } from "@/app/(admin)/dashboard/(index)/locations/lib/data";

export default async function FilterLocation() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Location</p>
      {locations?.map((location) => (
        <label
          key={`${location.id}-${location.name}`}
          htmlFor={`${location.id}-${location.name}`}
          className="font-semibold flex items-center gap-3"
        >
          <input
            type="checkbox"
            name="location"
            value={location.id}
            className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
          />
          <span>{location.name}</span>
        </label>
      ))}
    </div>
  );
}
