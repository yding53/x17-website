"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("正在创建账户…");
    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: {
        data: { username: String(form.get("username")) }
      }
    });

    if (error) return setMessage(error.message);
    setMessage("注册成功。请检查邮箱并完成验证。");
  }

  return (
    <main className="form-wrap">
      <div className="card">
        <h1>注册</h1>
        <form className="form" onSubmit={submit}>
          <input className="input" name="username" placeholder="用户名" required />
          <input className="input" name="email" type="email" placeholder="邮箱" required />
          <input className="input" name="password" type="password" minLength={8} placeholder="密码（至少8位）" required />
          <button className="button primary">创建账户</button>
        </form>
        {message && <p className="notice">{message}</p>}
        <p className="muted">已有账户？ <Link href="/login">去登录</Link></p>
      </div>
    </main>
  );
}
