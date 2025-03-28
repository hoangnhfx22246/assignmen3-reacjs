import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import ProductList from "../Components/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import { useSelector } from "react-redux";

export default function DetailPage() {
  const [productDetails, setProductDetails] = useState({}); //* state product details
  const [relatedProducts, setRelatedProducts] = useState([]); //* state related products
  const params = useParams(); //* lấu dữ liệu trên url
  const { isLoading, error, fetchingData } = useFetch(); //* sử dục custome hook để fetch dữ liệu từ api
  const enteredQuantity = useRef();

  const [mainImage, setMainImage] = useState("");
  const cartList = useSelector((state) => state.cart.cart.listCart);

  const dispatch = useDispatch();

  // * lấy dữ liệu về
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_URL_BACKEND;

    fetchingData(
      {
        url: `${backendUrl}/products/`,
      },
      (resData) => {
        const products = resData.result;
        const product = products.find((data) => {
          return data._id === params.productId;
        });

        setProductDetails(product);
        setMainImage(product.images[0]);
        setRelatedProducts(
          products.filter((data) => {
            return (
              data.category === product.category && data._id !== product._id
            );
          })
        );
      }
    );
  }, [fetchingData, params.productId]);

  const productInCart = cartList.find((cart) => cart.id === params.productId);
  const quantityCartProduct = productInCart ? productInCart.quantity : 0;
  const remainingQuantity =
    productDetails.quantity - quantityCartProduct >= 0
      ? productDetails.quantity - quantityCartProduct
      : 0;

  // * ****** click img handler
  function handlerClickImg(thumbnail) {
    setMainImage(thumbnail);
  }
  // * ****** handler change quantity
  function handlerChangeQuantity(num) {
    if (
      Number(enteredQuantity.current.value) + num > 0 &&
      Number(enteredQuantity.current.value) + num < 100
    ) {
      enteredQuantity.current.value =
        Number(enteredQuantity.current.value) + num;
    }
  }
  // * ****** handler add cart
  function addCart(e) {
    e.preventDefault();
    if (remainingQuantity <= 0) {
      alert("out of stock");
      return;
    }
    const quantity = Number(enteredQuantity.current.value);
    if (remainingQuantity - quantity < 0) {
      alert("maximum select quantity is " + remainingQuantity);
      return;
    }
    if (quantity > 0 && quantity < 100) {
      dispatch(
        cartActions.ADD_CART({
          id: productDetails._id,
          name: productDetails.name,
          img: productDetails.images[0],
          price: Number(productDetails.price),
          quantity,
          maxQuantity: productDetails.quantity,
        })
      );
    }
  }

  return (
    <section className="mt-10">
      <div className="container mx-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            {/* product details component */}
            <div className="flex flex-col md:grid grid-cols-12 gap-8 mb-20">
              <div className="grid grid-cols-4 md:flex flex-col gap-4">
                {productDetails.images?.map((image) => (
                  <img
                    key={image}
                    className={
                      `cursor-pointer p-1 ` +
                      (image === mainImage && "border-2")
                    }
                    src={import.meta.env.VITE_URL_BACKEND + "/" + image}
                    alt={productDetails.name}
                    onClick={() => {
                      handlerClickImg(image);
                    }}
                  />
                ))}
              </div>
              <div className="md:col-span-5 order-first md:order-none">
                <img
                  src={import.meta.env.VITE_URL_BACKEND + "/" + mainImage}
                  alt={productDetails.name}
                />
              </div>
              <div className="col-span-6 space-y-5">
                <h2 className="text-3xl font-medium">{productDetails.name}</h2>
                {remainingQuantity <= 0 && (
                  <h2 className="text-2xl font-medium bg-red-700 text-white p-2 inline-block">
                    out of stock
                  </h2>
                )}

                <p className="text-xl text-gray-500 font-light">
                  {Number(productDetails.price).toLocaleString() + " VND"}
                </p>
                <p className="text-gray-500 font-light text-sm leading-6">
                  {productDetails.short_desc}
                </p>
                <p className="uppercase tracking-wide font-medium">
                  Category:{" "}
                  <span className="text-xs font-normal text-gray-500 ml-2">
                    {productDetails.category}
                  </span>
                </p>
                <form className="flex" onSubmit={addCart}>
                  <div className="border-2 flex items-center px-4 justify-between">
                    <label
                      htmlFor="quantity"
                      className="uppercase font-light text-gray-400"
                    >
                      Quantity
                    </label>
                    <div className="flex items-center ml-14">
                      <button
                        className={`${
                          remainingQuantity <= 0 &&
                          "text-gray-300 cursor-not-allowed"
                        }`}
                        type="button"
                        onClick={() => {
                          handlerChangeQuantity(-1);
                        }}
                        disabled={remainingQuantity <= 0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4 rotate-180 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        step={1}
                        max={99}
                        name="quantity"
                        id="quantity"
                        className={`max-w-10 text-center ${
                          remainingQuantity <= 0 &&
                          "text-gray-400 cursor-not-allowed"
                        }`}
                        ref={enteredQuantity}
                        disabled={remainingQuantity <= 0}
                      />
                      <button
                        className={`${
                          remainingQuantity <= 0 &&
                          "text-gray-300 cursor-not-allowed"
                        }`}
                        type="button"
                        onClick={() => {
                          handlerChangeQuantity(1);
                        }}
                        disabled={remainingQuantity <= 0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    className={`bg-primary-black text-white py-2 px-6 italic font-light ${
                      remainingQuantity <= 0 && "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={remainingQuantity <= 0}
                  >
                    Add to cart
                  </button>
                </form>
              </div>
              <div className="col-span-7 md:mt-20 mt-12 space-y-5">
                <span className="uppercase text-white bg-primary-black px-6 py-3 inline-block text-sm">
                  description
                </span>
                <h3 className="uppercase tracking-wide font-medium">
                  product description
                </h3>
                <pre className="text-sm text-gray-500 font-light leading-6 inline-block w-full text-pretty">
                  {productDetails.long_desc}
                </pre>
              </div>
            </div>
            {/* Related Products */}
            <div className="space-y-6">
              <h3 className="uppercase tracking-wide font-medium text-xl">
                Related Products
              </h3>

              <ProductList
                products={relatedProducts}
                usePopup={false}
                classNameList={`grid md:grid-cols-4 grid-cols-2 gap-4`}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
