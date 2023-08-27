import React, { useState } from "react";
import { useApiData } from "../hooks/ProductApi";
import { ProductList } from "../interfaces/ProductInterface";
import { ProductsOrganism } from "../components/organisms/ProductsOrganism";
import SortFilter from "../components/molecules/Filter";
import { Link } from "react-router-dom";
import { PriceFilter } from "../components/molecules/PriceFilter";
import { StyleFilter } from "../components/molecules/StyleFilter";
import { RelatedProductsCarousel } from "../components/organisms/RelatedProductsOrganism";
export const Home = () => {
  const [sortOption, setSortOption] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedStyleRange, setSelectedStyleRange] = useState("all");
  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
  };

  const handleSortChange = (value: number) => {
    setSortOption(value);
  };
  const handleStyleRangeChange = (range: string) => {
    setSelectedStyleRange(range);
  };

  const apiKey = process.env.REACT_APP_VP_API_KEY || "";
  const apiURL =
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
  const requestPayload = {
    query: "toilets",
    sort: sortOption,
  };

  const { data, loading, error } = useApiData({
    apiURL,
    apiKey,
    requestPayload,
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.products) {
    return <div>No product data available</div>;
  }
  const products: ProductList[] = data.products;
  const filteredProducts: ProductList[] = products
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
    .filter((product: ProductList) => {
      if (selectedStyleRange === "all") {
        return true;
      }

      const productStyle = product.defaultCategory.name;
      return productStyle === selectedStyleRange;
    });

  return (
    <div className="w-full max-w-[1900px] flex flex-col flex-wrap justify-center pt-10 pb-32">
      <div className="bg-hero-image bg-blend-multiply bg-slate-400 bg-cover w-full justify-center items-end h-[90vh] flex pb-4">
        <div className="w-11/12 flex pb-8">
          <div className="w-full md:w-9/12 flex flex-col pb-16">
            <h1 className="text-white font-[600] leading-[1.125em] tracking-wide text-[2.35em] sm:text-[2.75em] lg:text-[4em]">
              Our biggest collection of toilets is here.
            </h1>
            <h2 className=" w-11/12 text-white mt-1 text-[1.95em] sm:text-[2.125em] tracking-wide  lg:text-[3em] leading-[1.124em]">
              Classic porcelein, modern plumbing
            </h2>
            <div className=" mt-8 border-[1.5px] border-white cursor-pointer py-1 hover:bg-white transition duration-300 hover:duration-300 rounded-full max-w-[200px] items-center justify-center flex">
              <Link
                className="text-white text-[1.5em] sm:text-[1.75em] hover:text-black  transition duration-300 hover:duration-300"
                to="/products"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-11/12  mx-auto mt-8">
            <h1 className=" text-[1.75em] sm:text-[2.4em] font-[500] leading-[1.2em]">
              Perfect plumbing for your bathroom.
            </h1>
            <h2 className="text-[1.6em] mt-1.5 sm:text-[2em] font-[400] leading-[1.2em] mb-10">
              Our newest range of toilets and baths
            </h2>
          </div>

          <div className="flex sm:flex-col">
            <div className="flex w-11/12 mx-auto justify-between flex-col md:flex-row">
              <div className="w-full md:w-1/3 sm:px-3  mx-auto sm:mt-8">
                <div className="w-full sm:w-11/12 mx-auto flex flex-col justify-center">
                  <SortFilter value={sortOption} onChange={handleSortChange} />
                  <div className="flex md:mt-2 flex-row md:flex-col h-[230px] sm:h-auto justify-between  items-end">
                    <div className="w-[49%]  md:w-full h-[220px] md:my-2 sm:h-auto">
                      <PriceFilter
                        selectedRange={selectedPriceRange}
                        onChange={handlePriceRangeChange}
                      />
                    </div>
                    <div className="w-[49%]  md:w-full h-[220px] sm:h-auto md:my-2">
                      <StyleFilter
                        selectedRange={selectedStyleRange}
                        onChange={handleStyleRangeChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row flex-wrap justify-around pt-5 pb-10">
                {filteredProducts.map((product: ProductList) => (
                  <ProductsOrganism
                  key={product.id}
                    sortOption={sortOption}
                    image_url={product.image.url}
                    product_name={product.productName}
                    average_rating={product.averageRating}
                    product_id={product.id}
                    product_price={product.price.priceIncTax}
                    product_alt_text={product.image.attributes.imageAltText}
                  />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="mt-18 h-[50vh] flex items-center justify-center tracking-wide">
                    <p className="text-[1.125em] font-[300]">
                      No products found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-10/12 mx-auto sm:mt-10 md:mt-20 ">
            <div>
              <h1 className=" text-[1.25em] tracking-wide mb-4 md:mb-10 sm:text-[1.5em] font-[500] leading-[1.2em]">
                Our highest rated toilets
              </h1>
            </div>
            <RelatedProductsCarousel
              relatedProducts={products}
              sortByHighestRating={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
