import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: videos }, { data: announcements }] = await Promise.all([
    supabase.from("videos").select("id,title,description,category").eq("is_published", true).limit(3),
    supabase.from("announcements").select("id,title,content").eq("is_published", true).limit(3)
  ]);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>X<span>17</span></h1>
          <p>一个集账户、每日签到、视频内容、下载和数据统计于一体的平台。</p>
          <div className="actions">
            <Link href="/videos" className="button primary">进入视频库</Link>
            <Link href="/register" className="button">创建账户</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>最新视频</h2>
          <div className="grid">
            {(videos ?? []).length ? videos!.map(v => (
              <Link className="card" key={v.id} href={`/videos/${v.id}`}>
                <h3>{v.title}</h3>
                <p className="muted">{v.description || "暂无描述"}</p>
                <small>{v.category || "未分类"}</small>
              </Link>
            )) : <div className="notice">暂时还没有公开视频。</div>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>公告</h2>
          <div className="grid">
            {(announcements ?? []).length ? announcements!.map(a => (
              <article className="card" key={a.id}>
                <h3>{a.title}</h3>
                <p className="muted">{a.content}</p>
              </article>
            )) : <div className="notice">暂时还没有公告。</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
