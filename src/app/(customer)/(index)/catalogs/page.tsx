import Navbar from "../_components/navbar";
import FilterBrands from "./_components/filter-brands";
import FilterCategories from "./_components/filter-categories";
import FilterLocation from "./_components/filter-location";
import FilterPrice from "./_components/filter-price";
import FilterStocks from "./_components/filter-stocks";
import ProductListing from "./_components/product-listing";
import SearchBar from "./_components/search-bar";

export default function CatalogsPage() {
  return (
    <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
      <Navbar />
      <SearchBar />
      <div
        id="catalog"
        className="w-full max-w-[1030px] mx-auto px-5 flex gap-[30px] mt-[50px] pb-[100px]"
      >
        <form
          action=""
          className="flex flex-1 flex-col bg-white p-[30px] gap-5 h-fit border border-[#E5E5E5] rounded-[30px]"
        >
          <h2 className="font-bold text-2xl leading-[34px]">Filters</h2>
          <FilterPrice />
          <hr className="border-[#E5E5E5]" />
          <FilterStocks />
          <hr className="border-[#E5E5E5]" />
          <FilterBrands />
          <hr className="border-[#E5E5E5]" />
          <FilterLocation />
          <hr className="border-[#E5E5E5]" />
          <FilterCategories />
        </form>
        <div className="w-[780px] flex flex-col bg-white p-[30px] gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
          <h2 className="font-bold text-2xl leading-[34px]">Products</h2>
          <ProductListing />
        </div>
      </div>
    </header>
  );
}
