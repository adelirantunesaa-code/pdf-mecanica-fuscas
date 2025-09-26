"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Facebook, MessageCircle } from 'lucide-react'

export function FacebookCopyGenerator() {
  const copies = [
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado para a área de transferência!')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">📱 Copies para Facebook</h2>
        <p className="text-gray-600">Frases otimizadas para grupos de Fusca</p>
      </div>

      {copies.map((copy, index) => (
        <Card key={index} className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{copy.title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {copy.engagement}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm whitespace-pre-line">
              {copy.text}
            </div>
            <button
              onClick={() => copyToClipboard(copy.text)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copiar Copy
            </button>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Dicas de Engajamento
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
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
  )
}