"use client";

import Link from "next/link";

interface TagFilterProps {
  tags: Record<string, number>;
  selectedTag?: string;
  category: "journal" | "thinking";
  availableTags: string[];
}

const tagLabels: Record<string, string> = {
  parenting: "育兒",
  "kids-talk": "童言童語",
  travel: "旅行",
  daily: "日常",
  "self-reflection": "自我對話",
  "mindful-reads": "好書分享",
  learning: "學習筆記",
};

export default function TagFilter({
  tags,
  selectedTag,
  category,
  availableTags,
}: TagFilterProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* 全部按鈕 */}
        <Link
          href={`/${category}`}
          className={`px-5 py-2 rounded-full text-sm transition-all ${
            !selectedTag
              ? "bg-charcoal-dark text-cream-light"
              : "bg-cream-light text-charcoal-dark hover:bg-cream-medium"
          }`}
        >
          全部
        </Link>

        {/* 標籤按鈕 */}
        {availableTags.map((tag) => {
          const count = tags[tag] || 0;
          if (count === 0) return null;

          return (
            <Link
              key={tag}
              href={`/${category}?tag=${tag}`}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                selectedTag === tag
                  ? "bg-charcoal-dark text-cream-light"
                  : "bg-cream-light text-charcoal-dark hover:bg-cream-medium"
              }`}
            >
              {tagLabels[tag] || tag} ({count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}
