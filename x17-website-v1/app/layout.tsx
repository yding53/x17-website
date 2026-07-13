import "./globals.css";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "X17",
  description: "X17 official platform"
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="zh-CN">
      <body>
        <nav className="nav">
          <div className="container nav-inner">
            <Link href="/" className="brand">X<span>17</span></Link>
            <div className="links">
              <Link href="/videos">视频库</Link>
              <Link href="/announcements">公告</Link>
              <Link href="/contact">联系我们</Link>
              {user ? (
                <>
                  <Link href="/account">我的账户</Link>
                  <Link href="/admin">后台</Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/login">登录</Link>
                  <Link href="/register">注册</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="container">© 2026 X17. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
