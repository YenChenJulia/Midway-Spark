import { client, Post } from '@/lib/sanity'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import TagFilter from '@/components/TagFilter'

// 取得所有思維室文章
async function getThinkingPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && category == "thinking"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    "tags": thinkingTags,
    excerpt,
    publishedAt
  }`

  return await client.fetch(query)
}

// 取得思維室的所有標籤及數量
async function getThinkingTags() {
  const query = `*[_type == "post" && category == "thinking"] {
    "tags": thinkingTags
  }`
  const posts: { tags?: string[] }[] = await client.fetch(query)

  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  return tagCount
}

// 標籤顯示名稱對應
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

export default async function ThinkingPage({
  searchParams,
}: {
  searchParams: { tag?: string }
}) {
  const allPosts = await getThinkingPosts()
  const tagCount = await getThinkingTags()
  
  const selectedTag = searchParams.tag
  const filteredPosts = selectedTag
    ? allPosts.filter(post => post.tags?.includes(selectedTag))
    : allPosts

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* 頁面標題 */}
      <header className="text-center mb-12">
        <div className="inline-block mb-4 text-4xl">💭</div>
        <h1 className="text-3xl md:text-4xl font-light text-charcoal-dark mb-3">
          思維室
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          深度反思與自我成長<br/>
          在文字中整理思緒，在反思中找到方向
        </p>
      </header>

      {/* 標籤篩選器 */}
      <TagFilter 
        tags={tagCount}
        selectedTag={selectedTag}
        category="thinking"
        availableTags={['self-reflection', 'mindful-reads', 'learning']}
      />

      {/* 文章列表（列表式排版）*/}
      {filteredPosts.length > 0 ? (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post._id}
              href={`/post/${post.slug.current}`}
              className="group block"
            >
              <article className="bg-white rounded-lg p-8 border border-accent-clay/20 hover:border-glow-gentle hover:shadow-lg hover:shadow-glow-warm/10 transition-all duration-300">
                {/* 日期 */}
                <time className="text-xs text-charcoal-light mb-3 block">
                  {format(new Date(post.publishedAt), 'yyyy年MM月dd日 EEEE', { locale: zhTW })}
                </time>

                {/* 標題 */}
                <h2 className="text-2xl font-light text-charcoal-dark mb-4 group-hover:text-accent-mauve transition-colors">
                  {post.title}
                </h2>

                {/* 摘要 */}
                {post.excerpt && (
                  <p className="text-charcoal-light leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {/* 標籤 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-soft-lavender text-charcoal-light"
                      >
                        #{getTagLabel(tag)}
                      </span>
                    ))}
                  </div>
                )}

                {/* 閱讀提示 */}
                <div className="mt-4 text-sm text-accent-mauve group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  閱讀全文
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-charcoal-light">
            {selectedTag ? '這個標籤還沒有文章' : '還沒有思維室文章'}
          </p>
        </div>
      )}

      {/* 顯示文章數量 */}
      <div className="text-center mt-12 text-sm text-charcoal-light">
        共 {filteredPosts.length} 篇文章
      </div>
    </div>
  )
}
