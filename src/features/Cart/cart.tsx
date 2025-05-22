'use client';
import Image from 'next/image';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { retrieveCart, getCheckoutUrl } from '@/utils/shopify';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmationModal from '@/components/ConfirmationModal';

function Cart() {
  const searchParams = useSearchParams();
  let cartid = searchParams.get('cartid');
  if (!cartid && typeof window !== 'undefined') {
    cartid = sessionStorage.getItem('cartId');
  }

  const { cart, setCart, removeFromCart } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{
    cartId: string;
    itemId: string;
  } | null>(null);

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
          toast.error('Failed to load cart', {
            description: 'Please try again later.',
          });
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

  const handleRemoveClick = (cartId: string, itemId: string) => {
    setItemToRemove({ cartId, itemId });
    setIsModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!itemToRemove) return;

    try {
      await removeFromCart(itemToRemove.cartId, itemToRemove.itemId);
      toast.success('Item removed from cart', {
        description: 'The item has been removed from your cart.',
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item', {
        description: 'Please try again later.',
      });
    } finally {
      setIsModalOpen(false);
      setItemToRemove(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
        <div className="xl:w-[1440px] w-[95%] mx-auto">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="lg:flex items-center justify-between mb-10 animate-pulse"
            >
              <div className="flex mt-14 gap-5 xl:w-[600px] items-center">
                <div className="bg-gray-200 rounded-lg w-[140px] h-[140px]" />
                <div className="space-y-3">
                  <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-5 lg:gap-12 mt-8 lg:mt-0">
                <div className="flex items-center justify-between p-1 w-[120px] h-[40px] border rounded-full border-[#2C2C2C] bg-gray-100">
                  <div className="h-6 w-6 bg-gray-200 rounded-full" />
                  <div className="h-4 w-6 bg-gray-200 rounded" />
                  <div className="h-6 w-6 bg-gray-200 rounded-full" />
                </div>
                <div className="bg-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center" />
                <div className="lg:hidden block">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="lg:block hidden">
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cartid || !cart?.lines?.edges?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
        <div className="text-center space-y-6">
          <Image
            src="/assets/Homepage/dots-icon.svg"
            alt="dots"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h1 className="text-3xl michroma-regular text-[#2C2C2C]">
            Your cart is empty
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Looks like you haven&apos;t added any items to your cart yet. Start
            shopping to fill your cart with amazing products!
          </p>
          <Link href="/">
            <button className="cursor-pointer text-white text-center rounded-full text-lg font-bold bg-[#007934] px-8 py-3 hover:bg-[#005f27] transition-colors mt-3">
              Start Shopping
            </button>
          </Link>
        </div>
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
            <Link href="/">
              <button className="cursor-pointer text-white text-center rounded-full text-xs lg:text-sm font-bold bg-[#007934] lg:w-[253px] w-[130px] h-[30px] lg:h-[45px] hover:bg-[#005f27] transition-colors">
                Continue shopping
              </button>
            </Link>
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
              removeFromCart={handleRemoveClick}
            />
          ))}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setItemToRemove(null);
        }}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="Are you sure you want to remove this item from your cart?"
      />
    </>
  );
}

export default Cart;
