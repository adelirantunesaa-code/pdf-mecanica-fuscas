"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, Users, Star, Clock, Wrench, Car, Shield, Facebook, Copy, Settings } from 'lucide-react'
import { stripePromise } from '@/lib/stripe'
import { PageContent, defaultContent } from '@/lib/types'
import Link from 'next/link'

export default function FuscaPDFLanding() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCopies, setShowCopies] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<PageContent>(defaultContent)
  const [isAdmin, setIsAdmin] = useState(false)

  // Verificar se é admin
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin')
    setIsAdmin(adminStatus === 'true')
  }, [])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    
    try {
      // Criar sessão de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          productName: content.title,
          price: content.price
        })
      })

      const { sessionId, url } = await response.json()

      if (url) {
        // Redirecionar para o Stripe Checkout
        window.location.href = url
      } else {
        alert('Erro ao processar pagamento. Tente novamente.')
      }
    } catch (error) {
      alert('Erro ao processar pagamento. Tente novamente.')
    }

    setLoading(false)
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

🔥 PROMOÇÃO RELÂMPAGO: R$ ${content.originalPrice.toFixed(2)} por apenas R$ ${content.price.toFixed(2)}!

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

De R$ ${content.originalPrice.toFixed(2)} por apenas R$ ${content.price.toFixed(2)} (hoje)

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
✅ Apenas R$ ${content.price.toFixed(2)} (promoção)

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
            {/* Botões admin aparecem apenas para admin */}
            {isAdmin && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowCopies(!showCopies)}
                  variant="outline"
                  className="text-blue-900 border-white hover:bg-white"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Copies Facebook
                </Button>
                <Link href="/admin">
                  <Button 
                    variant="outline"
                    className="text-blue-900 border-white hover:bg-white"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Facebook Copies Section - Apenas para admin */}
      {showCopies && isAdmin && (
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
                🔥 OFERTA LIMITADA - {Math.round((1 - content.price / content.originalPrice) * 100)}% OFF
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">Manual Completo</span><br />
                de Mecânica do<br />
                <span className="text-yellow-600">FUSCA</span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                {content.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>{content.description}</span>
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
                  <p className="text-gray-500 line-through text-lg">De R$ {content.originalPrice.toFixed(2)}</p>
                  <p className="text-4xl font-bold text-green-600">R$ {content.price.toFixed(2)}</p>
                  <p className="text-red-500 font-semibold">⏰ Oferta válida por tempo limitado!</p>
                </div>
              </div>

              {/* CTA Form */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleCheckout} className="space-y-4">
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
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        {loading ? 'Processando...' : `COMPRAR AGORA - R$ ${content.price.toFixed(2)}`}
                      </Button>
                      <p className="text-xs text-center opacity-90">
                        ✅ Pagamento 100% seguro • ✅ Acesso imediato • ✅ Garantia de 7 dias
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                      <h3 className="text-xl font-bold">Obrigado pelo interesse!</h3>
                      <p>Redirecionando para o pagamento...</p>
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
            {content.benefits.map((benefit, index) => {
              const [title, description] = benefit.split(' - ')
              const icons = [Wrench, Car, Shield]
              const Icon = icons[index] || Wrench
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </CardContent>
                </Card>
              )
            })}
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
            {content.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgência */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">⚠️ ATENÇÃO: Oferta por tempo limitado!</h2>
          <p className="text-xl mb-8">{content.urgencyText}</p>
          
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