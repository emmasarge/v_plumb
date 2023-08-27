import { ReactComponent as Truck } from "../../assets/icons/truck.svg"

interface AddToCartProps {
    itemNumber: number;

}

export const Cart = (props: AddToCartProps) => {
    return (
        <div className="flex w-11/12">
            {props.itemNumber > 0 &&
            <div className="bg-[#71c16a] shadow-md z-10 absolute ml-[0.125em] mt-[0.1em]   rounded-full w-[1.25em] flex justify-center items-center h-[1.25em] ">
                <p className=" text-white text-center text-[0.75em] font-[600] text-bold leading-[1.2em] mt-[0.125em]">{props.itemNumber}</p>
            </div>}
            <div className=" relative  h-[1.75em] flex w-[2.5em]">
                <Truck /></div>
        </div>
    )
}