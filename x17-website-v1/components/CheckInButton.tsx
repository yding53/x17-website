"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CheckInButton({ userId }: { userId: string }) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function checkIn() {
    const supabase = createClient();
    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase.from("checkins").insert({
      user_id: userId,
      checkin_date: today,
      points_earned: 1
    });

    if (error?.code === "23505") return setMessage("今天已经签到过了。");
    if (error) return setMessage(error.message);

    setMessage("签到成功！");
    router.refresh();
  }

  return (
    <div>
      <button className="button primary" onClick={checkIn}>每日签到</button>
      {message && <p className="notice">{message}</p>}
    </div>
  );
}
