import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function VideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("id,title,description,category,published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <main className="container section">
      <h1>视频库</h1>
      <div className="grid">
        {(videos ?? []).map(v => (
          <Link className="card" href={`/videos/${v.id}`} key={v.id}>
            <h3>{v.title}</h3>
            <p className="muted">{v.description || "暂无描述"}</p>
            <small>{v.category || "未分类"}</small>
          </Link>
        ))}
      </div>
      {!videos?.length && <div className="notice">管理员还没有发布视频。</div>}
    </main>
  );
}
