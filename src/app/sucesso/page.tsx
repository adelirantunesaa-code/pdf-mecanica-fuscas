"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Home } from 'lucide-react'
import Link from 'next/link'

export default function SucessoPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    // Aqui você pode fazer uma verificação adicional com o Stripe
    // para confirmar o pagamento e obter detalhes do cliente
    if (sessionId) {
      // Simular dados do cliente (em produção, busque do Stripe)
      setCustomerEmail('cliente@email.com')
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">
              🎉 Pagamento Confirmado!
            </h1>
            <p className="text-lg text-gray-600">
              Obrigado pela sua compra! Seu manual já está disponível para download.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-green-800">
              📧 Próximos Passos:
            </h2>
            <ul className="text-left text-green-700 space-y-2">
              <li>✅ Pagamento processado com sucesso</li>
              <li>✅ E-mail de confirmação enviado</li>
              <li>✅ Link de download enviado para seu e-mail</li>
              <li>✅ Acesso vitalício ao material</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Não recebeu o e-mail?</strong> Verifique sua caixa de spam ou entre em contato conosco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download Direto
              </Button>
              
              <Link href="/">
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-500 border-t pt-4">
            <p>ID da Transação: {sessionId}</p>
            <p>Suporte: contato@fuscaexpert.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}