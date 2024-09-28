import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section id="banner">
      <div className="container mx-auto">
        <div className="md:px-20 px-6 py-24 md:py-32 space-y-4 flex flex-col items-center text-center md:text-left md:items-start bg-[url('../src/assets/imgs/banner1.jpg')] bg-cover bg-center">
          <div className="uppercase text-sm tracking-widest text-gray-400">
            NEW INSPIRATION 2020
          </div>
          <h1 className="uppercase text-3xl font-medium max-w-[400px]  tracking-widest">
            20% OFF ON NEW SEASON
          </h1>
          <div>
            <Link to="/shop">
              <button className="bg-primary-black py-2 px-8 font-light text-white italic">
                Browse collections
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
