'use client';
import Image from 'next/image';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { retrieveCart, getCheckoutUrl } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

function Cart() {
  const searchParams = useSearchParams();
  const cartid = searchParams.get('cartid');

  const { cart, setCart, removeFromCart } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      if (cartid) {
        try {
          const [cartData, checkoutData] = await Promise.all([
            retrieveCart(cartid),
            getCheckoutUrl(cartid),
          ]);
          if (mounted) {
            setCart(cartData);
            setCheckoutUrl(checkoutData.cart.checkoutUrl);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }
      } else {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [cartid, setCart]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  if (!cartid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No cart found</div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:relative lg:h-[120vh]">
        <div className="flex bg-[#F4F4F4] items-center">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="lg:w-[100px] lg:h-[120px] lg:mt-0 mt-16 w-[40px] h-[50px]"
          />
          <div className="flex xl:w-[1440px] lg:mt-0  mt-16 mx-auto items-center w-full justify-between">
            <h1 className="lg:text-3xl text-sm michroma-regular text-center  text-[#2C2C2C]">
              Your cart{' '}
            </h1>
            <button className="cursor-pointer text-white text-center rounded-full text-xs lg:text-sm font-bold bg-[#007934] lg:w-[253px] w-[130px] h-[30px] lg:h-[45px]">
              Continue shopping
            </button>
          </div>
        </div>
        <div className="xl:w-[1440px] w-[95%] mx-auto">
          <div className="flex items-center mt-5 justify-between">
            <h1 className="lg:text-2xl text-sm  xl:w-[450px] roboto-condensed text-[#007934] font-bold">
              Product
            </h1>
            <h1 className="text-2xl  roboto-condensed text-[#007934] font-bold"></h1>
          </div>
          {cart?.lines?.edges?.map((item: any) => (
            <CartItem
              key={item.node.id}
              cartId={cart.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        {/* <hr className="my-5" />
        <div className="w-[1440px]  mx-auto ">
          <div className="float-right  mb-10 w-[350px]">
            <div className=" flex justify-between">
              <h1 className="text-white">g</h1>
              <h1 className="text-[#1d1d1d] text-center text-2xl font-bold">
                Subtotal
              </h1>
              <p className="text-[#007934]  font-bold text-2xl roboto-condensed">
                {cart?.lines?.edges
                  ?.reduce(
                    (total: number, item: any) =>
                      total +
                      parseFloat(
                        item.node.merchandise.product.priceRange.minVariantPrice
                          .amount,
                      ),
                    0,
                  )
                  .toFixed(2)}{' '}
              </p>
            </div>
            <p className="text-xl my-4 text-[#2C2C2C] opacity-60">
              Tax included. Shipping calculated at checkout.
            </p>
            {checkoutUrl && (
              <Link href={checkoutUrl}>
                <button className="cursor-pointer  text-white text-center rounded-full text-lg font-bold bg-[#007934] w-full h-[55px]">
                  Check out{' '}
                </button>
              </Link>
            )}
            <div className="flex  items-center  my-6 gap-5">
              <button className="cursor-pointer text-white text-center rounded-full text-xl font-bold bg-white border border-[#5433EB] flex justify-center items-center w-[203px] h-[50px]">
                {' '}
                <Image
                  src="/assets/ProductDetail/shop.svg"
                  alt="shop"
                  width={68}
                  height={34}
                />
              </button>{' '}
              <button className="cursor-pointer border text-gray-700 text-center rounded-full text-xl  bg-white border-gray-800 flex justify-center items-center w-[203px] h-[50px]">
                Goggle Play
              </button>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="flex bg-[#F4F4F4] items-center">
        <Image
          src="/assets/Homepage/dots-icon.svg"
          alt="dots"
          width={120}
          height={120}
        />
        <div className="flex w-full pr-24 items-center justify-center">
          <h1 className="text-3xl  michroma-regular text-center  text-[#2C2C2C]">
            You may also like{' '}
          </h1>
        </div>
      </div>
      <div>
        <Product />
      </div> */}
    </>
  );
}

export default Cart;
