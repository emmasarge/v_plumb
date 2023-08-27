import React from 'react';
import { ProductsOrganism } from './ProductsOrganism';
import { ProductList } from '../../interfaces/ProductInterface';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RelatedProductsCarouselProps {
  relatedProducts: ProductList[];
  sortByHighestRating: boolean;
}

export const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({ relatedProducts, sortByHighestRating }) => {
  const sortedProducts = sortByHighestRating
    ? relatedProducts.slice().sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    : relatedProducts;

  const slicedProducts = sortedProducts.slice(0, 7);
  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    easing: "linear",
    appendDots: (dots: any) => (
      <div className="bg-black mt-10 flex justify-center w-8/12 mx-auto">
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>  {slicedProducts.map((product) => (
      <div   key={product.id}className='mb-5 sm:mb-16'>
      <ProductsOrganism
        productCarousel={true}
        key={product.id}
        image_url={product.image.url}
        product_name={product.productName}
        average_rating={product.averageRating}
        product_id={product.id}
        product_price={product.price.priceIncTax}
        product_alt_text={product.image.attributes.imageAltText}
      />
      </div>
    ))}
    </Slider>
  );
};
