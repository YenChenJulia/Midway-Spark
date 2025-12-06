import { client, urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

// 取得單篇文章
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    "tags": coalesce(journalTags, thinkingTags),
    coverImage,
    excerpt,
    body,
    publishedAt
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  return post;
}

// 生成靜態參數（用於部署）
export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const categoryLabel = post.category === "journal" ? "生活誌" : "思維室";
  const categoryColor =
    post.category === "journal" ? "text-accent-rose" : "text-accent-mauve";

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* 返回按鈕 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-accent-rose transition-colors mb-8"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回首頁
      </Link>

      {/* 文章標題區 */}
      <header className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className={`${categoryColor} font-light`}>{categoryLabel}</span>
          <span className="text-charcoal-light">•</span>
          <time className="text-charcoal-light">
            {format(new Date(post.publishedAt), "yyyy年MM月dd日", {
              locale: zhTW,
            })}
          </time>
        </div>

        <h1 className="text-3xl md:text-4xl font-light text-charcoal-dark leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-charcoal-light leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* 標籤 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-soft-sage text-charcoal-light"
              >
                #{getTagLabel(tag)}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 封面圖片 */}
      {post.coverImage && (
        <div className="w-full mb-12 rounded-2xl bg-soft-blush/50 p-8 flex items-center justify-center min-h-96 max-h-128">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent blur-xl"></div>
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.coverImage.alt || post.title}
              width={1200}
              height={800}
              className="relative w-auto h-auto max-w-full max-h-112 object-contain rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-white/60"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))' }}
              priority
            />
          </div>
        </div>
      )}

      {/* 文章內容 */}
      <div className="prose prose-lg max-w-none text-left md:text-center">
        <div className="text-charcoal leading-relaxed space-y-6">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </div>

      {/* 分隔線 */}
      <div className="my-12 flex justify-center">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-clay to-transparent"></div>
      </div>

      {/* 返回按鈕 */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm text-charcoal border border-accent-clay/30 rounded-full hover:border-glow-gentle hover:shadow-md hover:shadow-glow-warm/10 transition-all"
        >
          回到首頁
        </Link>
      </div>
    </article>
  );
}

// 標籤轉換
function getTagLabel(tag: string): string {
  const tagMap: Record<string, string> = {
    parenting: "育兒感想",
    "kids-talk": "童言童語",
    travel: "旅遊紀錄",
    daily: "日常生活",
    "self-reflection": "自我對話",
    "mindful-reads": "好文分享",
    learning: "學習筆記",
  };
  return tagMap[tag] || tag;
}

// Portable Text 樣式組件
const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-light text-charcoal-dark mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-light text-charcoal-dark mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-glow-gentle pl-6 my-8 italic text-charcoal-light bg-soft-blush/30 py-4 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-charcoal-dark">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-charcoal">{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-rose underline hover:text-accent-mauve transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 my-6 ml-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 ml-4">
        {children}
      </ol>
    ),
  },
};
