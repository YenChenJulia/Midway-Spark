import { client, Post } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import TagFilter from '@/components/TagFilter'

// 取得所有生活誌文章
async function getJournalPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && category == "journal"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    "tags": journalTags,
    coverImage,
    excerpt,
    publishedAt
  }`

  return await client.fetch(query)
}

// 取得生活誌的所有標籤及數量
async function getJournalTags() {
  const query = `*[_type == "post" && category == "journal"] {
    "tags": journalTags
  }`
  const posts: { tags?: string[] }[] = await client.fetch(query)
  
  // 統計標籤數量
  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  return tagCount
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: { tag?: string }
}) {
  const allPosts = await getJournalPosts()
  const tagCount = await getJournalTags()
  
  // 根據選擇的標籤過濾
  const selectedTag = searchParams.tag
  const filteredPosts = selectedTag
    ? allPosts.filter(post => post.tags?.includes(selectedTag))
    : allPosts

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* 頁面標題 */}
      <header className="text-center mb-12">
        <div className="inline-block mb-4 text-4xl">📷</div>
        <h1 className="text-3xl md:text-4xl font-light text-charcoal-dark mb-3">
          生活誌
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          圖片與日常的溫柔記錄<br/>
          捕捉那些平凡卻珍貴的瞬間
        </p>
      </header>

      {/* 標籤篩選器 */}
      <TagFilter 
        tags={tagCount}
        selectedTag={selectedTag}
        category="journal"
        availableTags={['parenting', 'kids-talk', 'travel', 'daily']}
      />

      {/* 文章列表 */}
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-charcoal-light">
            {selectedTag ? '這個標籤還沒有文章' : '還沒有生活誌文章'}
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