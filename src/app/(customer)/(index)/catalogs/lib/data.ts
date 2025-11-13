import { TFilter } from "@/hooks/use-filter";
import { TProduct } from "@/type";

export async function fetchProducts(body?: TFilter): Promise<TProduct[]> {
  const response = await fetch("/api/catalog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
  });
  const data = await response.json();
  return data ?? [];
}
