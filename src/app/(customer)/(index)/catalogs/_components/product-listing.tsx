"use client";

import { useQuery } from "@tanstack/react-query";
import CardProduct from "../../_components/card-products";
import { fetchProducts } from "../lib/data";
import { useFilter } from "@/hooks/use-filter";

export default function ProductListing() {
  const { filter } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchProducts(filter),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-[30px]">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data?.map((product) => (
        <CardProduct
          key={product.id + product.name}
          item={product}
          href={`/product/details/${product.id}`}
        />
      ))}
    </div>
  );
}
