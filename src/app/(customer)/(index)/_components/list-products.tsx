import Link from "next/link";
import type { ReactNode } from "react";
import { getProducts } from "../lib/data";
import CardProduct from "./card-products";

interface ListProductProps {
  title: ReactNode;
}

export default async function ListProducts({ title }: ListProductProps) {
  const products = await getProducts();

  return (
    <div id="picked" className="w-full flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        <Link
          href="/catalog"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[30px]">
        {products?.map((item) => (
          <CardProduct
            key={`${item.name + item.id}`}
            item={{
              category_name: item.category.name,
              id: item.id,
              image_url: item.image_url,
              name: item.name,
              price: Number(item.price),
            }}
          />
        ))}
      </div>
    </div>
  );
}
