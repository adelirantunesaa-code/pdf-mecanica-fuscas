"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Download, Settings, Eye, EyeOff, CheckCircle, X, FileText, Users } from 'lucide-react'
import { PageContent, defaultContent } from '@/lib/types'
import Link from 'next/link'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [content, setContent] = useState<PageContent>(defaultContent)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState('')
  const [purchases, setPurchases] = useState<any[]>([])

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsAuthenticated(true)
      loadContent()
      loadPurchases()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('isAdmin', 'true')
        setMessage('Login realizado com sucesso!')
        loadContent()
        loadPurchases()
      } else {
        setMessage('Senha incorreta!')
      }
    } catch (error) {
      setMessage('Erro ao fazer login')
    }

    setLoading(false)
  }

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.warn('Erro ao carregar conteúdo')
    }
  }

  const loadPurchases = async () => {
    try {
      const response = await fetch('/api/purchases')
      if (response.ok) {
        const data = await response.json()
        setPurchases(data.purchases || [])
      }
    } catch (error) {
      console.warn('Erro ao carregar compras')
    }
  }

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content })
      })

      if (response.ok) {
        setMessage('Conteúdo salvo com sucesso!')
      } else {
        setMessage('Erro ao salvar conteúdo')
      }
    } catch (error) {
      setMessage('Erro ao salvar conteúdo')
    }

    setLoading(false)
  }

  const handlePdfUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdfFile) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('pdf', pdfFile)

      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setPdfUrl(data.url)
        setMessage('PDF enviado com sucesso!')
      } else {
        setMessage('Erro ao enviar PDF')
      }
    } catch (error) {
      setMessage('Erro ao enviar PDF')
    }

    setLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAdmin')
    setPassword('')
    setMessage('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Painel Administrativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Senha de Administrador</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              {message && (
                <div className={`text-center text-sm ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}
            </form>

            <div className="mt-6 pt-4 border-t">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Voltar para a página principal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Painel Administrativo
          </h1>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">
                Ver Página Principal
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Sair
            </Button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload de PDF */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Gerenciar PDF do Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePdfUpload} className="space-y-4">
                <div>
                  <Label htmlFor="pdf">Arquivo PDF do Manual</Label>
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Este PDF será liberado automaticamente após a compra
                  </p>
                </div>

                {pdfUrl && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">PDF configurado com sucesso!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      URL: {pdfUrl}
                    </p>
                  </div>
                )}

                <Button type="submit" disabled={loading || !pdfFile} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  {loading ? 'Enviando...' : 'Enviar PDF'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Compras Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Compras Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {purchases.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {purchases.map((purchase, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{purchase.email}</p>
                          <p className="text-sm text-gray-600">
                            R$ {purchase.amount?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(purchase.date).toLocaleDateString('pt-BR')}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            purchase.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {purchase.status === 'completed' ? 'Concluída' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nenhuma compra registrada ainda
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Editar Conteúdo da Página */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Editar Conteúdo da Página
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveContent} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título Principal</Label>
                  <Input
                    id="title"
                    value={content.title}
                    onChange={(e) => setContent({...content, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={content.subtitle}
                    onChange={(e) => setContent({...content, subtitle: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({...content, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço Atual (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={content.price}
                    onChange={(e) => setContent({...content, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={content.originalPrice}
                    onChange={(e) => setContent({...content, originalPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="urgencyText">Texto de Urgência</Label>
                <Textarea
                  id="urgencyText"
                  value={content.urgencyText}
                  onChange={(e) => setContent({...content, urgencyText: e.target.value})}
                  rows={2}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}