"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category: "journal" | "thinking";
  selectedTag?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  category,
  selectedTag,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (selectedTag) params.set("tag", selectedTag);
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    return `/${category}${queryString ? `?${queryString}` : ""}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* 上一頁 */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-cream-light text-charcoal-dark hover:bg-cream-medium transition-colors"
        >
          上一頁
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-cream-light/50 text-charcoal-light/50 cursor-not-allowed">
          上一頁
        </span>
      )}

      {/* 頁碼 */}
      <div className="flex gap-2">
        {renderPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-charcoal-light"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={`px-4 py-2 rounded-lg transition-all ${
                isCurrentPage
                  ? "bg-charcoal-dark text-cream-light"
                  : "bg-cream-light text-charcoal-dark hover:bg-cream-medium"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* 下一頁 */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-cream-light text-charcoal-dark hover:bg-cream-medium transition-colors"
        >
          下一頁
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-cream-light/50 text-charcoal-light/50 cursor-not-allowed">
          下一頁
        </span>
      )}
    </div>
  );
}
