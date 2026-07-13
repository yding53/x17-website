import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function VideoDetailPage({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();

  if (!video) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("video_views").insert({
      video_id: video.id,
      user_id: user.id
    });
  }

  return (
    <main className="container section">
      <div className="card">
        <h1>{video.title}</h1>
        <p className="muted">{video.description || "暂无描述"}</p>
        <p>分类：{video.category || "未分类"}</p>
        <div className="notice">
          视频播放与 100GB 安全下载将在下一阶段接入 Cloudflare R2。
        </div>
      </div>
    </main>
  );
}
