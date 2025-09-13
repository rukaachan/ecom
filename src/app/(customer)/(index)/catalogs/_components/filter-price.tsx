import Image from "next/image";

export default function FilterPrice() {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Range Harga</p>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image src="/assets/icons/dollar-circle.svg" alt="Product" width={20} height={20} />
        </div>
        <input
          type="number"
          id=""
          name=""
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Minimum price"
        />
      </div>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image src="/assets/icons/dollar-circle.svg" alt="Product" width={20} height={20} />
        </div>
        <input
          type="number"
          id=""
          name=""
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Maximum price"
        />
      </div>
    </div>
  );
}
