"use client";

import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButtonProps {
  postId: string;
  initialLikes?: number;
}

export default function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 檢查本地儲存，看用戶是否已按過讚
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setIsLiked(likedPosts.includes(postId));
  }, [postId]);

  // 獲取最新的按讚數
  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await fetch(`/api/likes?postId=${postId}`);
        const data = await response.json();
        if (data.likes !== undefined) {
          setLikes(data.likes);
        }
      } catch (error) {
        console.error("獲取按讚數失敗:", error);
      }
    }
    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    if (isLiked || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
        setIsLiked(true);

        // 儲存到本地，防止重複按讚
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        likedPosts.push(postId);
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      } else {
        console.error("按讚失敗:", data.error);
      }
    } catch (error) {
      console.error("按讚失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiked || isLoading}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg
        transition-all duration-300
        ${
          isLiked
            ? "bg-red-50 text-red-500 cursor-not-allowed"
            : "bg-white border border-accent-clay/30 text-charcoal hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        }
        disabled:opacity-50
      `}
      aria-label={isLiked ? "已按讚" : "按讚"}
    >
      {isLiked ? (
        <AiFillHeart className="text-xl animate-pulse" />
      ) : (
        <AiOutlineHeart className="text-xl" />
      )}
      <span className="font-medium">{likes}</span>
      {isLiked && <span className="text-sm">已按讚</span>}
    </button>
  );
}
