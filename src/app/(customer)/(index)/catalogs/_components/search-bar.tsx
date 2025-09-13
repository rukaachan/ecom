import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
  return (
    <div
      id="title"
      className="container max-w-[1130px] mx-auto flex items-center justify-between my-5"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <Link href="/shop" className="page text-sm text-[#6A7789] last-of-type:text-black">
            Shop
          </Link>
          <span className="text-sm text-[#6A7789]">/</span>
          <Link href="/browse" className="page text-sm text-[#6A7789] last-of-type:text-black">
            Browse
          </Link>
          <span className="text-sm text-[#6A7789]">/</span>
          <span className="page text-sm text-[#6A7789] last-of-type:text-black">Catalog</span>
        </div>
        <h1 className="font-bold text-4xl leading-9">Our Product Catalog</h1>
      </div>
      <form
        action="/search"
        method="GET"
        className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300"
      >
        <input
          type="text"
          id="search"
          name="q"
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Search product by name, brand, category"
        />
        <button type="submit" className="flex shrink-0">
          <Image
            src="/assets/icons/search-normal.svg"
            alt="icon"
            width={24}
            height={24}
            unoptimized
          />
        </button>
      </form>
    </div>
  );
}
