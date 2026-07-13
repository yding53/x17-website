import { createClient } from "@/lib/supabase/server";

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <main className="container section">
      <h1>公告</h1>
      <div className="grid">
        {(data ?? []).map(a => (
          <article className="card" key={a.id}>
            <h3>{a.title}</h3>
            <p className="muted">{a.content}</p>
          </article>
        ))}
      </div>
      {!data?.length && <div className="notice">暂无公告。</div>}
    </main>
  );
}
