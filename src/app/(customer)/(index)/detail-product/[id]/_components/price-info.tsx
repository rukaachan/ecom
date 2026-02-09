import Link from "next/link";
import Image from "next/image";

export default function PriceInfo() {
  return (
    <div className="w-[302px] flex flex-col shrink-0 gap-5 h-fit">
      <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Brand New</p>
          <p className="font-bold text-[32px] leading-[48px]">Rp 56.500.000</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/tick-circle.svg"
                width={24}
                height={24}
                alt="icon"
                className="w-6 h-6"
              />
            </div>
            <p className="font-semibold">Peti telur packaging</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/tick-circle.svg"
                width={24}
                height={24}
                alt="icon"
                className="w-6 h-6"
              />
            </div>
            <p className="font-semibold">Manual book instructions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/tick-circle.svg"
                width={24}
                height={24}
                alt="icon"
                className="w-6 h-6"
              />
            </div>
            <p className="font-semibold">Customer service 24/7</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/tick-circle.svg"
                width={24}
                height={24}
                alt="icon"
                className="w-6 h-6"
              />
            </div>
            <p className="font-semibold">Free delivery Jababeka</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/tick-circle.svg"
                width={24}
                height={24}
                alt="icon"
                className="w-6 h-6"
              />
            </div>
            <p className="font-semibold">Kwitansi orisinal 100%</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/cart"
            className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
          >
            Add to Cart
          </Link>
          <Link
            href="/"
            className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
          >
            Save to Wishlist
          </Link>
        </div>
      </div>
      <Link href="/">
        <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
          <div className="flex items-center gap-[10px]">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
              <Image
                src="/assets/icons/cake.svg"
                width={48}
                height={48}
                alt="icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold">Buy as a Gift</p>
              <p className="text-sm">Free Delivery</p>
            </div>
          </div>
          <div className="flex shrink-0">
            <Image
              src="/assets/icons/arrow-right.svg"
              width={20}
              height={20}
              alt="icon"
              className="w-5 h-5"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
