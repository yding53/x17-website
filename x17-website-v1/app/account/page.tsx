import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckInButton from "@/components/CheckInButton";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { count: downloads }, { count: views }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("downloads").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("video_views").select("*", { count: "exact", head: true }).eq("user_id", user.id)
  ]);

  return (
    <main className="container section">
      <h1>我的账户</h1>
      <div className="grid">
        <div className="card"><div className="muted">用户名</div><div className="stat">{profile?.username || "未设置"}</div></div>
        <div className="card"><div className="muted">积分</div><div className="stat">{profile?.points ?? 0}</div></div>
        <div className="card"><div className="muted">连续签到</div><div className="stat">{profile?.current_checkin_streak ?? 0} 天</div></div>
        <div className="card"><div className="muted">浏览记录</div><div className="stat">{views ?? 0}</div></div>
        <div className="card"><div className="muted">下载次数</div><div className="stat">{downloads ?? 0}</div></div>
        <div className="card"><div className="muted">身份</div><div className="stat">{profile?.role || "user"}</div></div>
      </div>
      <div style={{ marginTop: 24 }}>
        <CheckInButton userId={user.id} />
      </div>
    </main>
  );
}
