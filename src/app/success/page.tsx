"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Download, Car } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [pdfUrl, setPdfUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    if (sessionId) {
      verifyPaymentAndGetPdf()
    }
  }, [sessionId])

  const verifyPaymentAndGetPdf = async () => {
    try {
      // Verificar pagamento e obter dados da sessão
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      if (response.ok) {
        const data = await response.json()
        setCustomerEmail(data.customerEmail)
        
        // Obter URL do PDF
        const pdfResponse = await fetch('/api/upload-pdf')
        if (pdfResponse.ok) {
          const pdfData = await pdfResponse.json()
          setPdfUrl(pdfData.url)
        }

        // Registrar compra
        await fetch('/api/purchases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.customerEmail,
            amount: data.amount / 100, // Converter de centavos
            status: 'completed',
            sessionId: sessionId,
            date: new Date().toISOString()
          })
        })
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error)
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando seu pagamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Car className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">Fusca Expert</h1>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white shadow-2xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Pagamento Confirmado!
              </h1>
              
              <p className="text-lg text-gray-700 mb-6">
                Obrigado pela sua compra! Seu manual está pronto para download.
              </p>

              {customerEmail && (
                <p className="text-sm text-gray-600 mb-6">
                  Confirmação enviada para: <strong>{customerEmail}</strong>
                </p>
              )}

              {pdfUrl ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      📖 Manual Completo de Mecânica do Fusca
                    </h3>
                    <p className="text-green-700 mb-4">
                      Seu manual digital está disponível para download imediato!
                    </p>
                    
                    <a href={pdfUrl} download>
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg">
                        <Download className="w-5 h-5 mr-2" />
                        BAIXAR MANUAL AGORA
                      </Button>
                    </a>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">📋 Próximos passos:</h4>
                    <ul className="text-sm text-blue-700 text-left space-y-1">
                      <li>• Faça o download do PDF e salve em local seguro</li>
                      <li>• O arquivo pode ser aberto em qualquer dispositivo</li>
                      <li>• Você pode imprimir o manual se desejar</li>
                      <li>• Em caso de dúvidas, entre em contato conosco</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800">
                    O PDF está sendo preparado. Você receberá o link por email em alguns minutos.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <Link href="/">
                  <Button variant="outline" className="mr-4">
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="w-6 h-6 text-yellow-400" />
            <span className="font-bold">Fusca Expert</span>
          </div>
          <p className="text-gray-400">
            © 2024 - Todos os direitos reservados. Manual digital para entusiastas do Fusca.
          </p>
        </div>
      </footer>
    </div>
  )
}