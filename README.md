# News App

A simple Next.js application that fetches and displays news articles from a Supabase database, including images from a Supabase storage bucket.

## Setup

1. Create a Supabase project at [supabase.com](https://supabase.com).

2. Create a table named `ai_articles` with the following columns:
   - `id` (bigint, primary key, auto-increment)
   - `title` (text)
   - `content` (text)
   - `image_url` (text) - Filename of the image in the 'images' bucket
   - `created_at` (timestamp with time zone, default now())
   - `updated_at` (timestamp with time zone, default now())

3. **Important**: In your Supabase dashboard, go to the `ai_articles` table settings and disable Row Level Security (RLS) or create a policy that allows anonymous users to SELECT from the table. Since this app has no authentication, the table needs to be publicly readable.

4. Create a storage bucket named `images` for images and make it public.

4. Copy your Supabase project URL and anon key.

5. Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the news articles.

## Deploy on Vercel

1. Push your code to GitHub.

2. Connect your repository to Vercel.

3. In Vercel dashboard, add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

## Features

- Fetches news articles from Supabase database
- Displays images from Supabase storage
- Responsive design with Tailwind CSS
- No authentication required
- Linted and ready for production
