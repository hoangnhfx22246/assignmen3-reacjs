export default function Information() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid gap-4 py-6 md:grid-cols-3 justify-items-center bg-[#F8F9FA] md:py-14">
          <div>
            <h3 className="uppercase text-lg tracking-wider font-medium">
              FREE SHIPPING
            </h3>
            <p className="text-sm font-light text-gray-400">
              Free shipping worlwide
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg tracking-wider font-medium">
              24 X 7 SERVICE
            </h3>
            <p className="text-sm font-light text-gray-400">
              Free shipping worlwide
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg tracking-wider font-medium">
              FESTIVAL OFFER
            </h3>
            <p className="text-sm font-light text-gray-400">
              Free shipping worlwide
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 py-10 gap-4">
          <div className="text-center md:text-left">
            <h3 className="uppercase text-lg tracking-wider font-medium">
              let's be friends!
            </h3>
            <p className="text-sm font-light text-gray-400">
              Nisi nisi tempor consequat laboris nisi.
            </p>
          </div>
          <form className="flex">
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 w-full px-4 placeholder:text-xs placeholder:text-gray-300"
              placeholder="Enter your email address"
            />
            <button className="bg-primary-black text-white py-4 px-6">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
