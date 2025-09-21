"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFilter } from "@/hooks/use-filter";

export default function FilterPrice() {
  const { setFilter } = useFilter();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      });

      console.log(minPrice);
      console.log(maxPrice);
    }, 500);

    return () => clearTimeout(debounceInput);
  }, [minPrice, maxPrice, setFilter]);

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Range Harga</p>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image
            src="/assets/icons/dollar-circle.svg"
            alt="Product"
            width={20}
            height={20}
          />
        </div>
        <input
          type="number"
          id="minprice"
          name="minprice"
          value={minPrice === 0 ? "" : minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value === "" ? 0 : Number(e.target.value));
          }}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Minimum price"
        />
      </div>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image
            src="/assets/icons/dollar-circle.svg"
            alt="Product"
            width={20}
            height={20}
          />
        </div>
        <input
          type="number"
          id="maxprice"
          name="maxprice"
          value={maxPrice === 0 ? "" : maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value === "" ? 0 : Number(e.target.value));
          }}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Maximum price"
        />
      </div>
    </div>
  );
}
