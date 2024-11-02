import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageType, formData } = body;

    // Define package prices (in cents)
    const prices = {
      basic: 99900, // $99.00
      premium: 189900 // $199.00
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: packageType === 'basic' ? 'Basic Insurance Package' : 'Premium Insurance Package',
              description: `Insurance package for ${formData.firstName} ${formData.lastName}`,
            },
            unit_amount: prices[packageType as keyof typeof prices],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase`,
      metadata: {
        ...formData,
        packageType,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 