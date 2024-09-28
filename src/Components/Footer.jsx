import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section id="footer" className="bg-primary-black text-white mt-4">
      <div className="container mx-auto py-16 flex justify-between md:flex-row flex-col md:gap-0 gap-8 text-center md:text-left">
        <div>
          <h2 className="uppercase mb-6 text-xl">Customer services</h2>
          <ul className="capitalize text-sm font-light text-gray-400 flex flex-col gap-2">
            <li>
              <Link to="#">Help & Contact Us</Link>
            </li>
            <li>
              <Link to="#">Returns & Refunds</Link>
            </li>
            <li>
              <Link to="#">Online Stores</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="uppercase mb-6 text-xl">COMPANY</h2>
          <ul className="capitalize text-sm font-light text-gray-400 flex flex-col gap-2">
            <li>
              <Link to="#">What We Do</Link>
            </li>
            <li>
              <Link to="#">Available Service</Link>
            </li>
            <li>
              <Link to="#">Latest Posts</Link>
            </li>
            <li>
              <Link to="#">FAQs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="uppercase mb-6 text-xl">SOCIAL MEDIA</h2>
          <ul className="capitalize text-sm font-light text-gray-400 flex flex-col gap-2">
            <li>
              <Link to="#">Twitter</Link>
            </li>
            <li>
              <Link to="#">Instagram</Link>
            </li>
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Pinterest</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
