import { NextRequest, NextResponse } from 'next/server'

// Simulação de banco de dados em memória para compras
let purchases: any[] = []

export async function GET() {
  try {
    return NextResponse.json({ purchases })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const purchase = await request.json()
    
    // Adicionar timestamp se não existir
    if (!purchase.date) {
      purchase.date = new Date().toISOString()
    }
    
    purchases.push(purchase)
    
    return NextResponse.json({ success: true, purchase })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}