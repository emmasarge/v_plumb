import React, { useEffect, useState } from "react";
import { ProductList } from "../interfaces/ProductInterface";
import { usePaginatedProducts } from "../hooks/PaginateProducts";
import { ProductsOrganism } from "../components/organisms/ProductsOrganism";
import SortFilter from "../components/molecules/Filter";
import { PriceFilter } from "../components/molecules/PriceFilter";

export const Products = () => {
  const [sortOption, setSortOption] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
  };

  const itemsPerPage = 10;
  const handleSortChange = (value: number) => {
    setSortOption(value);
  };
  const apiKey = process.env.REACT_APP_VP_API_KEY || "";
  const apiURL =
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
  const initialRequestPayload = {
    query: "toilets",
    sort: sortOption,
  };

  const { data, nextPage, prevPage, loading, pageNumber } =
    usePaginatedProducts(
      { apiURL, apiKey, requestPayload: initialRequestPayload },
      itemsPerPage
    );

  const productsData = data?.products || null;
  let filteredProducts: ProductList[] = [];

  if (productsData) {
    filteredProducts = productsData
      .filter((product: ProductList) => {
        const isBestSeller = product.attributes.isBestSeller;
        const isRecommended = product.attributes.isRecommended;
        if (isBestSeller || isRecommended) {
          return true;
        }
      })
      .filter((product: ProductList) => {
        const productPrice = product.price.priceIncTax;
        if (selectedPriceRange === "low") {
          return productPrice < 200;
        } else if (selectedPriceRange === "medium") {
          return productPrice >= 300 && productPrice <= 400;
        } else if (selectedPriceRange === "high") {
          return productPrice > 450;
        }
        return true;
      })
      
  }

  if (productsData) {
    filteredProducts = productsData.filter((product: ProductList) => {
      const productPrice = product.price.priceIncTax;
      if (selectedPriceRange === "low") {
        return productPrice < 200;
      } else if (selectedPriceRange === "medium") {
        return productPrice >= 300 && productPrice <= 400;
      } else if (selectedPriceRange === "high") {
        return productPrice > 450;
      }
      return true;
    }
    );
  }
  useEffect(() => {
    if (data && data.pagination) {
      setCurrentPage(pageNumber + 1);
    }
  }, [pageNumber, data]);

  return (
    <div className="w-full flex flex-col flex-wrap justify-center  pt-28 pb-32">
      <div className="w-11/12  pl-10 mx-auto pt-20">
        <div className="pb-7">
          <h1 className="text-[2.4em] mb-8 font-[500] leading-[1.2em]">
            Our products.
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full ">
          <div className="flex flex-col md:w-1/3 ">
            <div className="mb-2">
              <SortFilter value={sortOption} onChange={handleSortChange} />
            </div>
            <div>
              <PriceFilter
                selectedRange={selectedPriceRange}
                onChange={handlePriceRangeChange}
              />
            </div>
          </div>

          <div className="w-full flex flex-row flex-wrap justify-center pt-6 md:pt-0 pb-10">
            {productsData &&
              filteredProducts.map((product: ProductList) => (
               
                <ProductsOrganism
                key={product.id}
                  image_url={product.image.url}
                  product_name={product.productName}
                  average_rating={product.averageRating}
                  product_id={product.id}
                  product_price={product.price.priceIncTax}
                  product_alt_text={product.image.attributes.imageAltText}
                />
              ))}

              {filteredProducts.length === 0 && <div className="mt-18 h-[50vh] flex items-center justify-center tracking-wide"><p className="text-[1.125em] font-[300]">No products found.</p></div>}
          </div>
        </div>
      </div>
      <div className="flex pb-20 pt-10 flex-row mx-auto items-center justify-around w-11/12 max-w-[900px]">
        <button
          className="hover:bg-[#71c16a] text-[1.125em] leading-[1.125em] hover:text-white font-[500]  flex w-1/2 md:w-full max-w-[200px] justify-center uppercase rounded-full px-5 py-1.5 border border-[#71c16a] bg-transparent text-[#71c16a] transition duration-300 hover:duration-300"
          onClick={prevPage}
        >
          Previous Page
        </button>
        <div>
          <p className="text-[#71c16a] font-[500] px-5">{currentPage} / {100}</p>
        </div>
        <button
          className="hover:bg-[#71c16a] text-[1.125em] leading-[1.125em] hover:text-white font-[500] w-1/2  flex md:w-full max-w-[200px] justify-center uppercase rounded-full px-5 py-1.5 border border-[#71c16a] bg-transparent text-[#71c16a] transition duration-300 hover:duration-300"
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};
