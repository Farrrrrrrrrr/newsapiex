'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createSupabaseClient } from '@/lib/supabase'

interface Article {
  id: number
  title: string
  content: string
  image_url: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase
          .from('articles')
          .select('*')

        if (error) {
          console.error('Error fetching articles:', error)
        } else {
          setArticles(data || [])
        }
      } catch (err) {
        console.error('Failed to create Supabase client:', err)
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">News Articles</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
              {article.image_url && (
                <Image
                  src={article.image_url}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-md mb-4"
                  unoptimized
                />
              )}
              <p className="text-gray-700">{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}