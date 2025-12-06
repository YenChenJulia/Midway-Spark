import { client, Post } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import TagFilter from '@/components/TagFilter'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 12

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
  searchParams: Promise<{ tag?: string; page?: string }>
}) {
  const allPosts = await getJournalPosts()
  const tagCount = await getJournalTags()

  // 根據選擇的標籤過濾
  const params = await searchParams
  const selectedTag = params.tag
  const currentPage = Number(params.page) || 1

  const filteredPosts = selectedTag
    ? allPosts.filter(post => post.tags?.includes(selectedTag))
    : allPosts

  // 計算分頁
  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

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
      {paginatedPosts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
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

      {/* 分頁導航 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        category="journal"
        selectedTag={selectedTag}
      />

      {/* 顯示文章數量 */}
      <div className="text-center mt-8 text-sm text-charcoal-light">
        共 {totalPosts} 篇文章
        {totalPages > 1 && ` · 第 ${currentPage} / ${totalPages} 頁`}
      </div>
    </div>
  )
}