import { useEffect } from "react";
import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import Information from "../Components/Information";
import ProductList from "../Components/ProductList";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function HomePage() {
  // todo get product data fetch API
  const [products, setProducts] = useState([]); //* lưu trữ danh sách products lấy từ API về

  // * sử dụng custom hooks useFetch để lấy dữ liệu products từ API về
  const { fetchingData } = useFetch();

  // lấy tất cả danh sách của product về
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_URL_BACKEND;
    fetchingData(
      {
        url: `${backendUrl}/products/`,
      },
      (data) => {
        setProducts(data.result);
      }
    );
  }, [fetchingData]);

  return (
    <div className="space-y-16">
      {/* Banner */}
      <Banner />
      {/* Categories */}
      <Categories />
      {/* products */}
      <section>
        <div className="container mx-auto">
          <p className="uppercase text-sm tracking-wider text-gray-400 mb-1">
            MADE THE HARD WAY
          </p>
          <h2 className="uppercase text-xl font-medium tracking-wider mb-6">
            TOP TRENDING PRODUCTS
          </h2>
          <ProductList
            products={products}
            classNameList="grid grid-cols-2 md:grid-cols-4 gap-4"
            usePopup={true}
          />
        </div>
      </section>
      <Information />
    </div>
  );
}
