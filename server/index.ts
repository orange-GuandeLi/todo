import { app } from "./app"

const server = Bun.serve({
  port: process.env.PORT!,
  fetch: app.fetch
})

console.log(`🚀 服务运行在 ${server.url} 🎉`)