import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchFormShop() {
  const navigate = useNavigate();
  // xử lý sự kiện onSubmit
  const [searchParams] = useSearchParams();
  const enteredSearch = useRef();
  const enteredSort = useRef();

  // reset value input
  useEffect(() => {
    enteredSearch.current.value = searchParams.get("search");
    enteredSort.current.value = searchParams.get("sort")
      ? searchParams.get("sort")
      : "default";
  }, [searchParams]);

  function handleSubmit(e) {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", enteredSearch.current.value);
    newSearchParams.set("sort", enteredSort.current.value);
    navigate(`?${newSearchParams.toString()}`);
  }
  return (
    <>
      <div className="md:col-span-3 order-1 md:order-none col-span-full">
        <form
          className="flex justify-between md:flex-row fle"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            className="border-2 py-2 px-4 placeholder:text-sm md:min-w-72 w-full"
            placeholder="Enter Search Here!"
            ref={enteredSearch}
          />
          <select
            name="sort"
            className="text-sm py-2 px-4 border-2 w-[150px]"
            ref={enteredSort}
            onChange={handleSubmit}
          >
            <option value="default">Default sorting</option>
            <option value="ascending">Ascending amount</option>
            <option value="decrease">Decreasing amount</option>
          </select>
        </form>
      </div>
    </>
  );
}
