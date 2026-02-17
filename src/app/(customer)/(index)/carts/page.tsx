import Navbar from "../_components/navbar";
import CartProducts from "./_components/cart-products";
import CheckoutForm from "./_components/checkout-form";

export default function CartsPage() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-7.5 h-120 -mb-77.5">
        <Navbar />
      </header>
      <div
        id="title"
        className="w-full max-w-[1030px] mx-auto px-5 flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">Shop</a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">Browse</a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">Details</a>
          </div>
          <h1 className="font-bold text-4xl leading-9">My Shopping Cart</h1>
        </div>
      </div>
      <CartProducts />
      <CheckoutForm />
    </>
  );
}
