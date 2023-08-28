import { Link } from "react-router-dom";
import { RatingStars } from "../molecules/RatingStars";
import { analytics_clickOnProduct } from "../utils/analytics";

interface ProductProps {
  image_url: string;
  product_name: string;
  average_rating: number;
  product_id: string;
  product_price: number;
  product_alt_text: string;
  sortOption?: number;
  productDetailPage?: boolean;
  productCarousel?: boolean;
  handleAddToCart?: () => void;
}
export const ProductsOrganism = (props: ProductProps) => {
  return (
      <div key={props.product_id}
        className={props.productDetailPage
            ? 'flex my-3 mx-1 items-stretch justify-center w-full'
            : props.productCarousel
            ? 'flex my-3 mx-1 items-end justify-between h-[40vh] w-full'
            : 'flex  mx-1 lg:mx-5 mb-8 items-center justify-between  max-w-[600px] w-full md:w-[25%] lg:w-[28%] shadow-md pb-2 rounded-[0.25em] scale-[100%] hover:scale-[102%] transition duration-300 hover:duration-300 hover:m-2'}
        
      >
        {props.productDetailPage ? 
          <div className="w-full md:w-11/12 justify-between items-center flex flex-col md:flex-row">
            <div className="w-11/12 flex justify-center sm:justify-start">
            <div className= " shadow-sm flex justify-start mx-auto  object-cover items-center w-full lg:w-8/12 mt-2">
              <img
                className="rounded-[0.25em] h-full w-full"
                src={`${props.image_url}`}
                alt={props.product_alt_text}
              />
            </div>
            </div>
            <div className="lg:mt-6 pb-4 flex w-full sm:w-11/12 h-full justify-between md:items-start flex-col">
            <div className="flex w-11/12 h-11/12 mt-3 md:mt-0 mx-auto md:w-10/12 md:max-w-[800px]  justify-between  items-stretch flex-col">
             <div className="lg:pb-6 ">
              <h1 className="text-[1.35em] md:text-[1.75em] lg:text-[2.25em] mt-3 leading-[1.125em]  font-[500] tracking-wide" >{props.product_name}</h1>
              <div>
               <p className="mt-3 mb-2 w-11/12 text-[1em] md:text-[1.2em]">Average customer rating: {""}</p> 
                {props.average_rating < 1 || props.average_rating === undefined
                  ? <p>"Not rated yet"</p>
                  :<div className="w-9/12 flex"> <RatingStars height="h-[1.25em]"  rating={props.average_rating}/></div>}
              </div>
              <p className="mt-8 text-[1.125em] md:text-[1.25em] leading-[1.2em]  font-[400]">Price: £{props.product_price}</p>

              </div>
              <div className="mt-10 lg:mt-12 flex w-full">
                <button onClick={props.handleAddToCart} className="border text-[1em] sm:text-[1.125em] lg:text-[1.25em] border-black tracking-wide hover:bg-black transition duration-300 hover:duration-300 hover:text-white py-2  sm:py-3.5 w-full md:w-8/12">Add to cart</button>
                </div>
            </div>
            </div>
          </div>
        : props.productCarousel ?
         <Link aria-label={props.product_name} onClick={()=>analytics_clickOnProduct(props.product_name, props.product_id)} className=" w-11/12 flex justify-around h-full "to={`/product/${props.product_id}`}>
        <div className="w-11/12 justify-around items-start h-full flex flex-col">
          <div className=" flex justify-center  object-cover items-center w-full max-w-[15em] sm:w-11/12  mt-2 ">
            <img
              className="rounded-[0.25em] h-auto"
              src={`${props.image_url}`}
              alt={props.product_alt_text}
            />
          </div>
          <div className="mt-2 pb-4 flex w-full justify-start items-start flex-col">
            <h1 className="text-[0.85em] leading-[1.2em]  tracking-wide" >{props.product_name}</h1>
            <p className="mt-2 text-[0.85em] leading-[1.2em]">Price: £{props.product_price}</p> 
          </div>
          <div className="font-[300] flex items-start justify-start text-[0.75em] leading-[1.2em] mt-1 mb-3 h-[0.2em]">
            
            {props.average_rating < 1 || props.average_rating === undefined
              ? <p>Not rated yet</p>
              : <div > <RatingStars height="h-[1em]" rating={props.average_rating}/></div>}
          </div>
        </div>
      </Link>:
        <Link aria-label={props.product_name} onClick={()=>analytics_clickOnProduct(props.product_name, props.product_id)} className=" w-full flex justify-center "to={`/product/${props.product_id}`}>
          <div className="w-11/12 max-w-[330px] py-2 justify-center items-center flex flex-col">
            <div className=" flex justify-center  object-cover items-center w-full max-w-[17em] sm:w-11/12  mt-2 ">
              <img
                className="rounded-[0.25em] h-auto"
                src={`${props.image_url}`}
                alt={props.product_alt_text}
              />
            </div>
            <div className="mt-2 pb-4 flex w-11/12 px-2 sm:w-10/12 justify-start items-start flex-col">
              <h1 className="text-[1em] leading-[1.2em] font-[500] tracking-wide" >{props.product_name}</h1>
              <p className="mt-2 text-[0.95em] tracking-wide leading-[1.2em]">Price: £{props.product_price}</p> 
              <div className="font-[300] text-[0.85em] mt-2 leading-[1.2em]">
              <p className="mb-1.5">  Average customer rating: {""}</p>
                {props.average_rating < 1 || props.average_rating === undefined
                  ? <p className="italic font-[200]">Not rated yet</p>
                  :  <RatingStars rating={props.average_rating}/>}
              </div>
         
            </div>
          </div>
        </Link>}

        
        
      </div>
  );
};
