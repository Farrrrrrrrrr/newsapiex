'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { createSupabaseClient } from '@/lib/supabase'

interface Article {
  id: number
  title: string
  content: string
  image_url: string
  created_at: string
  updated_at: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    console.log('Saved theme:', savedTheme)
    const isDark = savedTheme === 'dark'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    console.log('Initial dark mode set to:', isDark)
    console.log('HTML classes:', document.documentElement.className)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    console.log('Dark mode toggled to:', newDarkMode)
    console.log('HTML classes:', document.documentElement.className)
  }

  const getImageUrl = (filename: string) => {
    if (filename.startsWith('http')) {
      return filename
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return `${supabaseUrl}/storage/v1/object/${filename}`
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase
          .from('ai_articles')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching articles:', JSON.stringify(error, null, 2))
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
    return <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">News Articles</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <header className="mb-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">{article.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Published on {new Date(article.created_at).toLocaleDateString()}</p>
              </header>
              {article.image_url && (
                <div className="mb-6">
                  <Image
                    src={getImageUrl(article.image_url)}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                    unoptimized
                  />
                </div>
              )}
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{article.content}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}