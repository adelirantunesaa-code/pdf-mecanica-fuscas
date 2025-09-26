import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...', {
  apiVersion: '2024-06-20'
})

export async function POST(request: NextRequest) {
  try {
    const { email, productName, price } = await request.json()

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: productName || 'Manual Completo de Mecânica do Fusca',
              description: 'PDF digital com mais de 200 páginas',
            },
            unit_amount: Math.round((price || 29.90) * 100), // Converter para centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      metadata: {
        customer_email: email,
        product_name: productName || 'Manual Completo de Mecânica do Fusca'
      }
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })
  } catch (error) {
    console.error('Erro no checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao criar sessão de checkout' },
      { status: 500 }
    )
  }
}