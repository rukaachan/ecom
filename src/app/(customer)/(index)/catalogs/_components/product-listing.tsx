import CardProduct from "../../_components/card-products";

export default function ProductListing() {
  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {/*<Link href="/product/details/1" className="product-card">
        <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
          <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom-1.png"
              alt="Product"
              width={90}
              height={90}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-[22px]">iMac Green Energy</p>
              <p className="text-sm text-[#616369]">Desktops</p>
            </div>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 24.000.000
            </p>
          </div>
        </div>
      </Link>*/}

      <CardProduct
        item={{
          category_name: "Desktop",
          id: 1,
          image_url: "/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom-1.png",
          name: "IMAC Green Energy",
          price: 120000,
        }}
        href="/product/details/1"
      />
      <CardProduct
        item={{
          category_name: "Headphones",
          id: 2,
          image_url: "/assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom-1.png",
          name: "AirPods Max",
          price: 75000,
        }}
        href="/product/details/2"
      />
      <CardProduct
        item={{
          category_name: "Smartphone",
          id: 3,
          image_url: "/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom-1.png",
          name: "iPhone 15 Pro",
          price: 180000,
        }}
        href="/product/details/3"
      />
      <CardProduct
        item={{
          category_name: "Desktop",
          id: 4,
          image_url: "/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom-1.png",
          name: 'iMac 24"',
          price: 150000,
        }}
        href="/product/details/4"
      />
      <CardProduct
        item={{
          category_name: "Accessory",
          id: 5,
          image_url: "/assets/thumbnails/246c3a1bf608fed816e2e038784fa995.png",
          name: "Wireless Charger",
          price: 15000,
        }}
        href="/product/details/5"
      />
      <CardProduct
        item={{
          category_name: "Accessory",
          id: 6,
          image_url: "/assets/thumbnails/ea49dfcfcaa4513d799050c989d2f177.png",
          name: "USB-C Hub",
          price: 25000,
        }}
        href="/product/details/6"
      />
    </div>
  );
}
