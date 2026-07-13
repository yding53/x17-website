# X17 Website V1

功能：
- 首页
- 注册 / 登录 / 退出
- 用户账户页
- 每日签到
- 视频库与详情页
- 公告页
- 管理员入口
- Supabase 数据连接

## 本地运行

1. 复制 `.env.example` 为 `.env.local`
2. 填入 Supabase URL 和 Publishable Key
3. 运行：

```bash
npm install
npm run dev
```

## 重要

100GB 视频上传和安全下载将在下一阶段接入 Cloudflare R2。
