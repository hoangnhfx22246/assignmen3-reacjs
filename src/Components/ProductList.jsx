import { useEffect } from "react";
import { useState } from "react";
import ProductItem from "./ProductItem";
import { useFetch } from "../hooks/useFetch";
import { defer, json, useSearchParams } from "react-router-dom";

/**
 * ProductList
 * @param {Array} products dữ liệu của các product
 * @param {boolean} usePopup nếu true thì cho phép show popup khi click vào từng sản phẩm
 * @param {string} classNameList để thêm classname cho danh sách sản phẩm dùng để style số cột,...
 */
export default function ProductList({ products, classNameList, usePopup }) {
  return (
    <>
      <div className={classNameList}>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductItem
              key={product["_id"]}
              product={product}
              usePopup={usePopup}
            />
          ))}
      </div>
    </>
  );
}
// cách 2: để lấy dữ liệu
// // todo lấy dữ liệu products từ api
// async function loadProducts() {
//   const response = await fetch(
//     "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
//   );

//   if (!response.ok) {
//     throw json({ message: "Could not fetch Products." }, { status: 500 });
//   } else {
//     const resData = await response.json();
//     return resData.events;
//   }
// }
// // todo sử dụng để đọc khi truy cập vào vào đường dẫn
// export function loader() {
//   return defer({
//     events: loadProducts(),
//   });
// }
