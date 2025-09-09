import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { rupiahFormat } from "@/lib/utils";
import { getProducts } from "../lib/data";

interface ListProductProps {
  title: ReactNode;
}

export default async function ListProducts({ title }: ListProductProps) {
  const products = await getProducts();

  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        <Link
          href="/catalog"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {products?.map((item) => (
          <Link key={`${item.name + item.id}`} href="/details" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={200}
                  height={90}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold leading-[22px]">{item.name}</p>
                  <p className="text-sm text-[#616369]">{item.category.name}</p>
                </div>
                <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                  {rupiahFormat(BigInt(item.price))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
