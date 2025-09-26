export interface PageContent {
  title: string
  subtitle: string
  price: number
  originalPrice: number
  description: string
  benefits: string[]
  testimonials: {
    name: string
    text: string
    rating: number
  }[]
  urgencyText: string
}

export const defaultContent: PageContent = {
  title: "Manual Completo de Mecânica do FUSCA",
  subtitle: "Tudo que você precisa saber para dominar a mecânica do seu Fusca. Desde manutenção básica até reparos avançados, com linguagem simples e ilustrações detalhadas.",
  price: 29.90,
  originalPrice: 97.00,
  description: "+200 páginas de conteúdo prático",
  benefits: [
    "Manutenção Preventiva - Cronograma completo de manutenção para manter seu Fusca sempre em dia",
    "Motor e Transmissão - Tudo sobre o motor boxer e câmbio do Fusca, com dicas de regulagem",
    "Sistema Elétrico - Diagnóstico e reparo de problemas elétricos mais comuns"
  ],
  testimonials: [
    {
      name: "João Silva, SP",
      text: "Finalmente encontrei um manual que explica tudo de forma simples! Consegui resolver vários problemas do meu Fusca 78.",
      rating: 5
    },
    {
      name: "Carlos Mendes, RJ", 
      text: "Material excelente! As ilustrações ajudam muito. Economizei uma fortuna em oficina depois que comprei.",
      rating: 5
    }
  ],
  urgencyText: "Apenas 50 cópias disponíveis com este desconto especial. Depois volta para o preço normal de R$ 97,00"
}