import { NextRequest, NextResponse } from 'next/server'
import { defaultContent, PageContent } from '@/lib/types'

// Simulação de banco de dados em memória (em produção, use um banco real)
let pageContent: PageContent = { ...defaultContent }

export async function GET() {
  try {
    return NextResponse.json(pageContent, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password, content } = await request.json()

    // Verificar senha (em produção, use hash e salt)
    if (password !== process.env.ADMIN_PASSWORD && password !== 'admin123') {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    if (content) {
      pageContent = { ...pageContent, ...content }
      return NextResponse.json({ success: true, content: pageContent })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}