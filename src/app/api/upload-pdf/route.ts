import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Armazenamento em memória para URL do PDF
let pdfUrl = ''

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Verificar se é PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são permitidos' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Criar diretório se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Diretório já existe
    }

    // Salvar arquivo
    const filename = `manual-fusca-${Date.now()}.pdf`
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Armazenar URL
    pdfUrl = `/uploads/${filename}`

    return NextResponse.json({ 
      success: true, 
      url: pdfUrl,
      filename 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ url: pdfUrl })
}