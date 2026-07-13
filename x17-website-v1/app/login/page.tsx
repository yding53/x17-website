"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("正在登录…");
    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password"))
    });

    if (error) return setMessage(error.message);
    router.push("/account");
    router.refresh();
  }

  return (
    <main className="form-wrap">
      <div className="card">
        <h1>登录</h1>
        <form className="form" onSubmit={submit}>
          <input className="input" name="email" type="email" placeholder="邮箱" required />
          <input className="input" name="password" type="password" placeholder="密码" required />
          <button className="button primary">登录</button>
        </form>
        {message && <p className="notice">{message}</p>}
        <p className="muted">没有账户？ <Link href="/register">立即注册</Link></p>
      </div>
    </main>
  );
}
