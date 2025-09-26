"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, Users, Star, Clock, Wrench, Car, Shield, Facebook, Copy } from 'lucide-react'
import type { NextApiRequest, NextApiResponse } from "next"

export default function FuscaPDFLanding() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCopies, setShowCopies] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const res = await fetch("/api/checkout", { method: "POST" })
    const data = await res.json()

    if (data.id) {
      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?preference_id=${data.id}`
    }
  } catch (err) {
    alert("Erro ao iniciar o pagamento. Tente novamente.")
    console.error(err)
  }

  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado para a área de transferência!')
  }

  const facebookCopies = [
    {
      title: "Copy Urgência + Benefício",
      text: `🚗 FUSQUEIROS, ATENÇÃO! 🚗

Cansado de gastar uma FORTUNA na oficina com seu Fusca?

📖 Manual COMPLETO de Mecânica do Fusca
✅ +200 páginas com TUDO explicado
✅ Linguagem simples, sem enrolação
✅ Ilustrações detalhadas passo a passo
✅ Desde manutenção básica até reparos avançados

🔥 PROMOÇÃO RELÂMPAGO: R$ 97 por apenas R$ 29,90!

Pare de depender de mecânico para TUDO!
Torne-se independente com seu Fusquinha! 💪

👆 LINK NA BIO ou comenta "QUERO" que eu mando no PV!

#fusca #fusqueiro #mecanica #diy #volkswagen`,
      engagement: "Alta conversão"
    },
    {
      title: "Copy Storytelling",
      text: `Lembra quando seu Fusca te deixou na mão? 😅

Eu também já passei por isso...

Até que descobri os SEGREDOS da mecânica do Fusca que os mecânicos não contam!

Agora meu Fusca 78 roda liso que nem seda! 🚗💨

📚 Compilei TUDO em um manual completo:
• Motor boxer sem mistérios
• Sistema elétrico descomplicado  
• Manutenção preventiva que FUNCIONA
• Dicas que só quem tem experiência sabe

De R$ 97 por apenas R$ 29,90 (hoje)

Quem quer parar de sofrer com pane? 🙋‍♂️

#fusca #mecanica #volkswagen #fusqueiro`,
      engagement: "Conexão emocional"
    },
    {
      title: "Copy Pergunta + Solução",
      text: `PERGUNTA SINCERA: 

Quantas vezes seu Fusca já te deixou na mão por um probleminha BESTA que você poderia ter resolvido em casa? 🤔

❌ Fusível queimado = R$ 50 na oficina
❌ Regulagem do carburador = R$ 80
❌ Troca de óleo = R$ 60
❌ Problema na ignição = R$ 120

TOTAL: Mais de R$ 300 por mês! 😱

✅ SOLUÇÃO: Manual Completo de Mecânica do Fusca
✅ Aprenda a resolver 90% dos problemas em casa
✅ Economize MILHARES por ano
✅ Apenas R$ 29,90 (promoção)

Comentem "MANUAL" que eu mando o link! 👇

#fusca #economia #mecanica #diy`,
      engagement: "Interação alta"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-bold">Fusca Expert</h1>
            </div>
            <Button 
              onClick={() => setShowCopies(!showCopies)}
              variant="outline"
              className="text-blue-900 border-white hover:bg-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Copies Facebook
            </Button>
          </div>
        </div>
      </header>

      {/* Facebook Copies Section */}
      {showCopies && (
        <section className="py-8 bg-blue-900 text-white">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">📱 Copies para Facebook</h2>
            <p className="text-center mb-8 text-blue-200">Frases otimizadas para grupos de Fusca</p>
            
            <div className="grid gap-6">
              {facebookCopies.map((copy, index) => (
                <Card key={index} className="bg-white text-gray-900">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg">{copy.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {copy.engagement}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm whitespace-pre-line max-h-60 overflow-y-auto">
                      {copy.text}
                    </div>
                    <Button
                      onClick={() => copyToClipboard(copy.text)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Copy
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-green-50 border-green-200 text-green-800">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">💡 Dicas de Engajamento</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Poste entre 19h-22h:</strong> Horário de maior engajamento</li>
                  <li>• <strong>Use emojis:</strong> Aumentam visibilidade em 25%</li>
                  <li>• <strong>Responda TODOS os comentários:</strong> Algoritmo favorece</li>
                  <li>• <strong>Faça perguntas:</strong> Gera mais interação</li>
                  <li>• <strong>Conte histórias:</strong> Pessoas se identificam</li>
                  <li>• <strong>Crie urgência:</strong> "Apenas hoje", "Últimas vagas"</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold">
                🔥 OFERTA LIMITADA - 70% OFF
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">Manual Completo</span><br />
                de Mecânica do<br />
                <span className="text-yellow-600">FUSCA</span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Tudo que você precisa saber para <strong>dominar a mecânica do seu Fusca</strong>. 
                Desde manutenção básica até reparos avançados, com linguagem simples e ilustrações detalhadas.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>+200 páginas de conteúdo</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Ilustrações detalhadas</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Linguagem simples</span>
                </div>
              </div>

              {/* Preço */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-400">
                <div className="text-center space-y-2">
                  <p className="text-gray-500 line-through text-lg">De R$ 97,00</p>
                  <p className="text-4xl font-bold text-green-600">R$ 29,90</p>
                  <p className="text-red-500 font-semibold">⏰ Oferta válida por tempo limitado!</p>
                </div>
              </div>

              {/* CTA Form */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="text-xl font-bold text-center">
                        🚗 GARANTA SEU MANUAL AGORA!
                      </h3>
                      <Input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-gray-900"
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        COMPRAR AGORA - R$ 29,90
                      </Button>
                      <p className="text-xs text-center opacity-90">
                        ✅ Pagamento 100% seguro • ✅ Acesso imediato • ✅ Garantia de 7 dias
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                      <h3 className="text-xl font-bold">Obrigado pelo interesse!</h3>
                      <p>Em breve você receberá as instruções de pagamento no seu e-mail.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Imagem do Fusca */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <Car className="w-32 h-32 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Manual Digital</h3>
                  <p className="text-gray-600">PDF de alta qualidade</p>
                  <p className="text-gray-600">Compatível com todos os dispositivos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            O que você vai aprender:
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Manutenção Preventiva</h3>
                <p className="text-gray-600">
                  Cronograma completo de manutenção para manter seu Fusca sempre em dia
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Car className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Motor e Transmissão</h3>
                <p className="text-gray-600">
                  Tudo sobre o motor boxer e câmbio do Fusca, com dicas de regulagem
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Sistema Elétrico</h3>
                <p className="text-gray-600">
                  Diagnóstico e reparo de problemas elétricos mais comuns
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            O que dizem nossos clientes:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Finalmente encontrei um manual que explica tudo de forma simples! 
                  Consegui resolver vários problemas do meu Fusca 78."
                </p>
                <p className="font-semibold text-gray-900">- João Silva, SP</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Material excelente! As ilustrações ajudam muito. Economizei uma fortuna 
                  em oficina depois que comprei."
                </p>
                <p className="font-semibold text-gray-900">- Carlos Mendes, RJ</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgência */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">⚠️ ATENÇÃO: Oferta por tempo limitado!</h2>
          <p className="text-xl mb-8">
            Apenas <strong>50 cópias</strong> disponíveis com este desconto especial.
            Depois volta para o preço normal de R$ 97,00
          </p>
          
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 text-lg"
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Download className="w-5 h-5 mr-2" />
            GARANTIR MINHA CÓPIA AGORA
          </Button>
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
