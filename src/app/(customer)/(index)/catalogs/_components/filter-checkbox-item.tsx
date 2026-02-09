"use client";

import type { ChangeEvent } from "react";
import { useFilter } from "@/hooks/use-filter";
import type { ProductStatus } from "@prisma/client";

interface filterCheckboxItemProps {
  id: string;
  value: string;
  type?: "stock" | "brands" | "locations" | "categories";
}

export default function FilterCheckboxItem({ id, value, type }: filterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "stock":
        if (e.target.checked) {
          setFilter({
            stock: [...(filter?.stock ?? []), e.target.value as ProductStatus],
          });
        } else {
          setFilter({
            stock: filter?.stock?.filter((val) => val !== e.target.value),
          });
        }
        break;

      case "brands":
        if (e.target.checked) {
          setFilter({
            brands: [...(filter?.brands ?? []), Number.parseInt(e.target.value, 10)],
          });
        } else {
          setFilter({
            brands: filter?.brands?.filter((val) => val !== Number.parseInt(e.target.value, 10)),
          });
        }
        break;

      case "categories":
        if (e.target.checked) {
          setFilter({
            categories: [...(filter?.categories ?? []), Number.parseInt(e.target.value, 10)],
          });
        } else {
          setFilter({
            categories: filter?.categories?.filter(
              (val) => val !== Number.parseInt(e.target.value, 10)
            ),
          });
        }
        break;

      case "locations":
        if (e.target.checked) {
          setFilter({
            locations: [...(filter?.locations ?? []), Number.parseInt(e.target.value, 10)],
          });
        } else {
          setFilter({
            locations: filter?.locations?.filter(
              (val) => val !== Number.parseInt(e.target.value, 10)
            ),
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <label key={`${id + value}`} className="font-semibold flex items-center gap-3">
      <input
        id={`${id + value}`}
        type="checkbox"
        onChange={onChange}
        value={id}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
      />
      <span>{value}</span>
    </label>
  );
}
