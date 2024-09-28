import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section id="categories">
      <div className="container mx-auto text-center">
        <p className="uppercase text-sm tracking-wider text-gray-400 mb-1">
          CAREFULLY CREATED COLLECTIONS
        </p>
        <h2 className="uppercase text-xl font-medium tracking-wider mb-6">
          BROWSE OUR CATEGORIES
        </h2>
        <div className="grid gap-6 grid-cols-6">
          <Link to="/shop" className="col-span-3 hover:opacity-60 duration-150">
            <img src="/product_1.png" alt="product_1" />
          </Link>
          <Link to="/shop" className="col-span-3 hover:opacity-60 duration-150">
            <img src="/product_2.png" alt="product_2" />
          </Link>
          <Link to="/shop" className="col-span-2 hover:opacity-60 duration-150">
            <img src="/product_3.png" alt="product_3" />
          </Link>
          <Link to="/shop" className="col-span-2 hover:opacity-60 duration-150">
            <img src="/product_4.png" alt="product_4" />
          </Link>
          <Link to="/shop" className="col-span-2 hover:opacity-60 duration-150">
            <img src="/product_5.png" alt="product_5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
