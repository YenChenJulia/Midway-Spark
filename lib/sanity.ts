import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from 'sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// 圖片 URL 生成器
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// TypeScript 型別定義
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: 'journal' | 'thinking'
  tags?: string[]
  coverImage?: SanityImage
  excerpt?: string
  publishedAt: string
  body: PortableTextBlock[]
  likes?: number
}