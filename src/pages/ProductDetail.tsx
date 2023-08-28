import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductList } from '../interfaces/ProductInterface';
import { ProductsOrganism } from '../components/organisms/ProductsOrganism';
import { RelatedProductsCarousel } from '../components/organisms/RelatedProductsOrganism';
import { useCart } from '../context/CartProvider';
import { analytics_clickOnProduct } from '../components/utils/analytics';

export const ProductDetail = (props:any) => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<ProductList | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [relatedProducts, setRelatedProducts] = useState<ProductList[]>([]);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(props);
    analytics_clickOnProduct(props.product_name, props.product_id)
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_VP_API_KEY || '';
    const apiURL = 'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
    const requestPayload = {
      query: 'toilets',
    };

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${apiURL}?${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.products) {
          setRelatedProducts(responseData.products);
          const selectedProduct = responseData.products.find((prod: ProductList) => prod.id === id);
          setProduct(selectedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`An error occurred while fetching data: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className='flex w-full max-w-[1900px] justify-center items-center flex-col pt-24 pb-32'>
      <div className='w-full flex sm:pt-10 pb-5 sm:pb-16'>
       <ProductsOrganism
            productDetailPage={true}
            handleAddToCart={handleAddToCart}
            image_url={product.image.url}
            product_name={product.productName}
            average_rating={product.averageRating}
            product_id={product.id}
            product_price={product.price.priceIncTax}
            product_alt_text={product.image.attributes.imageAltText}
          />
          </div>
          <div className='w-11/12 flex flex-col lg:pt-5'> 
          <h1 className="tracking-wider text-[1.25em] sm:text-[1.55em] lg:text-[1.9em] font-[400] leading-[1.2em] mb-6 md:mb-12">Our customer recommend these toilets:</h1>
      <RelatedProductsCarousel relatedProducts={relatedProducts} sortByHighestRating={true} />
    </div></div>
  );
};

