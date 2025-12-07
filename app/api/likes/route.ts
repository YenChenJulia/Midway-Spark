import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

// 取得文章的按讚數
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "需要提供 postId" }, { status: 400 });
  }

  try {
    const query = `*[_type == "post" && _id == $postId][0]{ likes }`;
    const result = await client.fetch(query, { postId });

    return NextResponse.json({ likes: result?.likes || 0 });
  } catch (error) {
    console.error("獲取按讚數失敗:", error);
    return NextResponse.json({ error: "獲取按讚數失敗" }, { status: 500 });
  }
}

// 增加按讚數
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ error: "需要提供 postId" }, { status: 400 });
    }

    // 需要有寫入權限的 token
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
    });

    // 先獲取當前的 likes 數量
    const currentPost = await writeClient.fetch(
      `*[_type == "post" && _id == $postId][0]{ likes }`,
      { postId }
    );

    const currentLikes = currentPost?.likes || 0;
    const newLikes = currentLikes + 1;

    // 更新 likes 數量
    await writeClient
      .patch(postId)
      .set({ likes: newLikes })
      .commit();

    return NextResponse.json({ likes: newLikes });
  } catch (error) {
    console.error("更新按讚數失敗:", error);
    return NextResponse.json({ error: "更新按讚數失敗" }, { status: 500 });
  }
}
