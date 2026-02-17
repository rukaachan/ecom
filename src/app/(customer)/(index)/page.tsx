import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ListBrands from "./_components/list-brands";
import ListCategory from "./_components/list-category";
import ListProduts from "./_components/list-products";
import Navbar from "./_components/navbar";

export default function LandingPage() {
  return (
    <div>
      <header className="bg-[#EFF3FA] pt-[30px] pb-[50px]">
        <Navbar />
        <div className="w-full max-w-[1030px] mx-auto px-5 flex items-center justify-between gap-1 mt-[50px]">
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-[10px] p-[8px_16px] rounded-full bg-white w-fit">
              <div className="w-[22px] h-[22px] flex shrink-0">
                <Image
                  src="/assets/icons/crown.svg"
                  alt="crown icon"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-sm">Most Popular 100th Product in Belanja</p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <h1 className="font-bold text-[55px] leading-[55px]">Working Faster 10x</h1>
              <p className="text-lg leading-[34px] text-[#6A7789]">
                Dolor si amet lorem super-power features riches than any other platform devices AI
                integrated.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/carts"
                className="p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white"
              >
                Add to Cart
              </Link>
              <Link href="/details" className="p-[18px_24px] rounded-full font-semibold bg-white">
                View Details
              </Link>
            </div>
          </div>
          <div className="w-[588px] h-[360px] flex shrink-0 overflow-hidden relative">
            <Image
              src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom-2.png"
              alt="banner"
              fill
              sizes="(max-width: 768px) 100vw, 588px"
              priority
              className="object-contain"
            />
            <div className="absolute top-[60%] bg-white p-[14px_16px] rounded-3xl flex items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/code-circle.svg"
                  alt="code icon"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <p className="font-semibold text-sm">
                Bonus Mac OS <br /> Capitan Pro
              </p>
            </div>
            <div className="absolute right-0 top-[30%] bg-white p-[14px_16px] rounded-3xl flex flex-col items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/star-outline.svg"
                  alt="star icon"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <p className="font-semibold text-sm text-center">
                Include <br /> Warranty
              </p>
            </div>
          </div>
        </div>
        <div
          id="testimonials"
          className="w-full max-w-[1030px] mx-auto px-5 flex items-center justify-center gap-10 mt-[50px]"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p1.png"
                alt="customer photo"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Awesome product!</p>
              <p className="text-xs leading-[18px]">Jemmie Pemilia</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p2.png"
                alt="customer photo"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Money saver 25%</p>
              <p className="text-xs leading-[18px]">Angga Risky</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p3.png"
                alt="customer photo"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">I love the warranty</p>
              <p className="text-xs leading-[18px]">Petina Malaka</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p4.png"
                alt="customer photo"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Big deals ever!</p>
              <p className="text-xs leading-[18px]">Udin Sarifun</p>
            </div>
          </div>
        </div>
      </header>
      <section
        id="content"
        className="w-full max-w-[1030px] mx-auto px-5 flex flex-col gap-[50px] pt-[50px] pb-[100px]"
      >
        <Suspense fallback={<span>Loading..</span>}>
          <ListCategory />
        </Suspense>

        <Suspense fallback={<span>Loading..</span>}>
          <ListProduts
            title={
              <>
                Most Picked <br /> Quality Products
              </>
            }
          />
        </Suspense>

        <div id="rewards">
          <Suspense fallback={<span>Loading..</span>}>
            <ListBrands />
          </Suspense>
        </div>

        <Suspense fallback={<span>Loading..</span>}>
          <ListProduts
            title={
              <>
                New Releases <br /> From Official Stores
              </>
            }
          />
        </Suspense>
      </section>
    </div>
  );
}
