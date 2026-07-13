import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/account");

  const [{ count: users }, { count: videos }, { count: downloads }, { count: views }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("videos").select("*", { count: "exact", head: true }),
    supabase.from("downloads").select("*", { count: "exact", head: true }),
    supabase.from("video_views").select("*", { count: "exact", head: true })
  ]);

  return (
    <main className="container section">
      <h1>后台管理</h1>
      <div className="grid">
        <div className="card"><div className="muted">用户</div><div className="stat">{users ?? 0}</div></div>
        <div className="card"><div className="muted">视频</div><div className="stat">{videos ?? 0}</div></div>
        <div className="card"><div className="muted">浏览</div><div className="stat">{views ?? 0}</div></div>
        <div className="card"><div className="muted">下载</div><div className="stat">{downloads ?? 0}</div></div>
      </div>
      <div className="notice" style={{ marginTop: 24 }}>
        下一阶段会增加：新增视频、编辑公告、上传到 R2、生成临时下载链接和用户管理。
      </div>
    </main>
  );
}
