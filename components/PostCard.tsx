"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { Post } from "@/lib/sanity";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const categoryLabel = post.category === "journal" ? "生活誌" : "思維室";
  const categoryColor =
    post.category === "journal" ? "text-accent-rose" : "text-accent-mauve";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/post/${post.slug.current}`} className="group block h-full">
        <div className="h-full bg-white rounded-lg overflow-hidden border border-accent-clay/20 hover:border-glow-gentle hover:shadow-lg hover:shadow-glow-warm/10 transition-all duration-300">
          {/* 封面圖片 */}
          {post.coverImage && (
            <div className="relative h-48 w-full overflow-hidden bg-soft-blush">
              <Image
                src={urlFor(post.coverImage).width(600).height(400).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* 微光效果 */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* 內容區 */}
          <div className="p-6 space-y-3">
            {/* 分類標籤 */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`${categoryColor} font-light`}>
                {categoryLabel}
              </span>
              <span className="text-charcoal-light">•</span>
              <time className="text-charcoal-light">
                {format(new Date(post.publishedAt), "yyyy.MM.dd", {
                  locale: zhTW,
                })}
              </time>
            </div>

            {/* 標題 */}
            <h3 className="text-lg font-light text-charcoal-dark group-hover:text-accent-rose transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* 摘要 */}
            {post.excerpt && (
              <p className="text-sm text-charcoal-light leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* 標籤 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-soft-sage text-charcoal-light"
                  >
                    #{getTagLabel(tag)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// 標籤中英文轉換
function getTagLabel(tag: string): string {
  const tagMap: Record<string, string> = {
    parenting: "育兒感想",
    "kids-talk": "童言童語",
    travel: "旅遊紀錄",
    daily: "日常生活",
    "personal-growth": "個人追求",
    mindfulness: "身心靈成長",
    learning: "學習",
  };
  return tagMap[tag] || tag;
}
