import Image from "next/image";
import Link from "next/link";
import { rupiahFormat } from "@/lib/utils";

type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

interface CardProductProps {
  item: TProduct;
  href?: string;
}

export default function CardProduct({ item, href = "/details" }: CardProductProps) {
  return (
    <Link key={`${item.name + item.id}`} href={href} className="product-card">
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
          <p className="font-semibold leading-[22px]">{item.name}</p>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#616369]">{item.category_name}</p>
          </div>
          <p className="font-semibold text-[#0D5CD7] leading-[22px]">
            {rupiahFormat(BigInt(item.price))}
          </p>
        </div>
      </div>
    </Link>
  );
}
