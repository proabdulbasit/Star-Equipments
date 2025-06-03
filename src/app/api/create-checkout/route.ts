import { NextResponse } from 'next/server';
import { addToCart, getCheckoutUrl } from '@/utils/shopify';

export async function POST(request: Request) {
  try {
    const { variantId, quantity } = await request.json();

    if (!variantId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 },
      );
    }

    const { cartCreate } = await addToCart(variantId, quantity);

    if (!cartCreate?.cart?.id) {
      throw new Error('Failed to create cart');
    }

    const checkoutData = await getCheckoutUrl(cartCreate.cart.id);
    const checkoutUrl = checkoutData.cart.checkoutUrl;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 },
    );
  }
}
