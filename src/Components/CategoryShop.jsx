import { NavLink, useSearchParams } from "react-router-dom";

export default function CategoryShop() {
  //* lấy dữ liệu từ searchParams
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <div className="categories-filter md:col-span-1 col-span-full">
        <ul>
          <h4 className="uppercase text-white bg-black py-2 px-4 font-medium">
            Apple
          </h4>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=all"
              className={category === "all" ? "text-yellow-500" : undefined}
            >
              All
            </NavLink>
          </li>
        </ul>
        <ul>
          <h4 className="uppercase py-2 px-4 font-medium bg-[#F6F9F6]">
            Phone
          </h4>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=iphone"
              className={category === "iphone" ? "text-yellow-500" : undefined}
            >
              iPhone
            </NavLink>
          </li>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=ipad"
              className={category === "ipad" ? "text-yellow-500" : undefined}
            >
              iPad
            </NavLink>
          </li>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=macbook"
              className={category === "macbook" ? "text-yellow-500" : undefined}
            >
              MacBook
            </NavLink>
          </li>
        </ul>
        <ul>
          <h4 className="uppercase py-2 px-4 font-medium bg-[#F6F9F6]">
            Other
          </h4>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=mouse"
              className={category === "mouse" ? "text-yellow-500" : undefined}
            >
              Mouse
            </NavLink>
          </li>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=keyboard"
              className={
                category === "keyboard" ? "text-yellow-500" : undefined
              }
            >
              Keyboard
            </NavLink>
          </li>
          <li className="py-2 px-4 text-gray-500">
            <NavLink
              to="?category=other"
              className={category === "other" ? "text-yellow-500" : undefined}
            >
              Other
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
