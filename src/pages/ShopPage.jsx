import CategoryShop from "../Components/CategoryShop";
import SearchFormShop from "../Components/SearchFormShop";
import ProductList from "../Components/ProductList";
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function ShopPage() {
  const [products, setProducts] = useState([]); // Lưu trữ danh sách sản phẩm lấy từ API
  const [productsToShow, setProductsToShow] = useState([]); // Danh sách sản phẩm được hiển thị
  const { isLoading, error, fetchingData } = useFetch(); // Sử dụng custom hook useFetch để lấy dữ liệu từ API

  // Lấy giá trị tìm kiếm từ URL nếu có
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetchingData(
      {
        url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      },
      (data) => {
        setProducts(data);
      }
    );
  }, [fetchingData]);

  // Tìm kiếm và lọc sản phẩm
  useEffect(() => {
    let filteredProducts = [...products];
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sort === "ascending") {
          return a.price - b.price;
        } else if (sort === "decrease") {
          return b.price - a.price;
        } else return 0;
      });
    }
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        if (category === "other") {
          return product.category === "watch" || product.category === "airpod";
        } else {
          return product.category === category;
        }
      });
    }
    setProductsToShow(filteredProducts);
  }, [category, sort, search, products]);

  //* phân trang
  const itemsPerPage = 9; //* số product có trong 1 trang
  const [itemOffset, setItemOffset] = useState(0); //* thứ tự phần tử đầu tiên trên 1 trang hiện tại
  const endOffset = itemOffset + itemsPerPage; //* thứ tự phần tử cuối trên 1 trang hiện tại
  const currentItems = productsToShow.slice(itemOffset, endOffset); //* dữ liệu các product có khi phân trang
  const pageCount = Math.ceil(productsToShow.length / itemsPerPage); //* tổng số trang sẽ có

  const handlePageClick = (event) => {
    //* sử lý sự kiện khi thay đổi trang
    const newOffset = (event.selected * itemsPerPage) % productsToShow.length;
    setItemOffset(newOffset);
  };

  return (
    <section>
      <div className="container mx-auto">
        {/* Tiêu đề trang */}
        <div className="uppercase flex justify-between md:flex-row flex-col  items-center md:px-20 py-16 bg-[#F6F9F6]">
          <h2 className="text-3xl tracking-wider">Shop</h2>
          <p className="text-gray-400">shop</p>
        </div>
        <div className="grid grid-cols-4 my-10 gap-x-10 gap-y-4">
          <h3 className="categories-head uppercase text-xl font-medium tracking-wider mb-4">
            Categories
          </h3>
          {/* Tìm kiếm theo input */}
          <SearchFormShop />
          {/* Thanh tìm kiếm Categories */}
          <CategoryShop />
          <div className="products col-span-full md:col-span-3 mt-4 order-2 md:order-none">
            {/* Hiển thị danh sách sản phẩm */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
                <ProductList
                  classNameList="grid grid-cols-2 md:grid-cols-3 gap-4"
                  usePopup={false}
                  products={currentItems}
                />
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                      />
                    </svg>
                  }
                  renderOnZeroPageCount={null}
                  containerClassName="flex mt-20 justify-end"
                  pageClassName="flex items-center"
                  pageLinkClassName="border-2 px-3 py-1"
                  previousLinkClassName="border-2 px-3 h-full flex items-center"
                  nextLinkClassName="border-2 px-3 h-full flex items-center"
                  activeLinkClassName="bg-primary-black text-white border-primary-black"
                  // className="bg-primary-black text-white border-primary-black justify-end"
                />
                <p className="text-right mt-1 text-sm text-gray-400">{`Showing ${
                  itemOffset + 1
                } - ${endOffset} of ${itemsPerPage} results`}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
