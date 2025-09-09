import Image from "next/image";
import Link from "next/link";
import { getBrands } from "../lib/data";

export default async function ListBrands() {
  const brands = await getBrands();

  return (
    <div id="brands" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">
          Explore Our <br /> Popular Brands
        </h2>
        <Link
          href="/catalog"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {brands?.map((item) => (
          <Link key={`${item.id + item.logo}`} href="/brand/microsoft" className="logo-card">
            <div className="bg-white flex items-center justify-center p-[30px_20px] rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[30px] flex shrink-0 items-center justify-center overflow-hidden">
                <Image
                  src={item.logo_url}
                  alt="Brands"
                  width={100}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
